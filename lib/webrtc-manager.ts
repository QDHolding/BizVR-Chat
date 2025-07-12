export interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: Date
  type: 'text' | 'emoji' | 'system'
}

export interface PeerConnection {
  id: string
  connection: RTCPeerConnection
  dataChannel?: RTCDataChannel
  userName: string
  isConnected: boolean
}

export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate' | 'join' | 'leave' | 'user-info'
  data: any
  from: string
  to?: string
  roomId: string
}

export class WebRTCManager {
  private peers: Map<string, PeerConnection> = new Map()
  private localUserId: string
  private localUserName: string
  private roomId: string
  private onMessageCallback?: (message: ChatMessage) => void
  private onPeerConnectedCallback?: (peerId: string, userName: string) => void
  private onPeerDisconnectedCallback?: (peerId: string) => void
  private signaling: WebSocket | null = null

  constructor(userId: string, userName: string, roomId: string) {
    this.localUserId = userId
    this.localUserName = userName
    this.roomId = roomId
    this.setupSignaling()
  }

  private setupSignaling() {
    // For now, we'll use a simple in-memory signaling
    // In production, you'd use a WebSocket server
    this.simulateSignaling()
  }

  private simulateSignaling() {
    // Simulate signaling with localStorage for demo purposes
    // In production, replace with actual WebSocket signaling server
    const channel = new BroadcastChannel(`webrtc-signaling-${this.roomId}`)
    
    channel.addEventListener('message', (event) => {
      const message: SignalingMessage = event.data
      if (message.from !== this.localUserId) {
        this.handleSignalingMessage(message)
      }
    })

    // Announce presence
    this.sendSignalingMessage({
      type: 'join',
      data: { userName: this.localUserName },
      from: this.localUserId,
      roomId: this.roomId
    })
  }

  private sendSignalingMessage(message: SignalingMessage) {
    const channel = new BroadcastChannel(`webrtc-signaling-${this.roomId}`)
    channel.postMessage(message)
  }

  private async handleSignalingMessage(message: SignalingMessage) {
    switch (message.type) {
      case 'join':
        await this.handlePeerJoin(message.from, message.data.userName)
        break
      case 'offer':
        await this.handleOffer(message.from, message.data, message.data.userName)
        break
      case 'answer':
        await this.handleAnswer(message.from, message.data)
        break
      case 'candidate':
        await this.handleCandidate(message.from, message.data)
        break
      case 'leave':
        this.handlePeerLeave(message.from)
        break
    }
  }

  private async handlePeerJoin(peerId: string, userName: string) {
    if (peerId === this.localUserId || this.peers.has(peerId)) return
    
    // Create offer for new peer
    const peerConnection = await this.createPeerConnection(peerId, userName)
    const dataChannel = peerConnection.createDataChannel('chat', {
      ordered: true
    })
    
    this.setupDataChannel(dataChannel, peerId)
    
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    
    this.sendSignalingMessage({
      type: 'offer',
      data: {
        offer: offer,
        userName: this.localUserName
      },
      from: this.localUserId,
      to: peerId,
      roomId: this.roomId
    })
  }

  private async handleOffer(peerId: string, data: any, userName: string) {
    if (this.peers.has(peerId)) return
    
    const peerConnection = await this.createPeerConnection(peerId, userName)
    
    // Handle incoming data channel
    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel
      this.setupDataChannel(dataChannel, peerId)
    }
    
    await peerConnection.setRemoteDescription(data.offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    
    this.sendSignalingMessage({
      type: 'answer',
      data: answer,
      from: this.localUserId,
      to: peerId,
      roomId: this.roomId
    })
  }

  private async handleAnswer(peerId: string, answer: RTCSessionDescriptionInit) {
    const peer = this.peers.get(peerId)
    if (peer) {
      await peer.connection.setRemoteDescription(answer)
    }
  }

  private async handleCandidate(peerId: string, candidate: RTCIceCandidateInit) {
    const peer = this.peers.get(peerId)
    if (peer) {
      await peer.connection.addIceCandidate(candidate)
    }
  }

  private handlePeerLeave(peerId: string) {
    const peer = this.peers.get(peerId)
    if (peer) {
      peer.connection.close()
      this.peers.delete(peerId)
      this.onPeerDisconnectedCallback?.(peerId)
    }
  }

  private async createPeerConnection(peerId: string, userName: string): Promise<RTCPeerConnection> {
    const configuration: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    }
    
    const peerConnection = new RTCPeerConnection(configuration)
    
    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'candidate',
          data: event.candidate,
          from: this.localUserId,
          to: peerId,
          roomId: this.roomId
        })
      }
    }
    
    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
      const peer = this.peers.get(peerId)
      if (peer) {
        peer.isConnected = peerConnection.connectionState === 'connected'
        
        if (peerConnection.connectionState === 'connected') {
          this.onPeerConnectedCallback?.(peerId, userName)
        } else if (peerConnection.connectionState === 'disconnected' || 
                   peerConnection.connectionState === 'failed') {
          this.onPeerDisconnectedCallback?.(peerId)
        }
      }
    }
    
    const peerInfo: PeerConnection = {
      id: peerId,
      connection: peerConnection,
      userName: userName,
      isConnected: false
    }
    
    this.peers.set(peerId, peerInfo)
    return peerConnection
  }

  private setupDataChannel(dataChannel: RTCDataChannel, peerId: string) {
    const peer = this.peers.get(peerId)
    if (peer) {
      peer.dataChannel = dataChannel
    }
    
    dataChannel.onopen = () => {
      console.log(`Data channel opened with ${peerId}`)
    }
    
    dataChannel.onmessage = (event) => {
      try {
        const message: ChatMessage = JSON.parse(event.data)
        this.onMessageCallback?.(message)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
    
    dataChannel.onclose = () => {
      console.log(`Data channel closed with ${peerId}`)
    }
  }

  public sendMessage(text: string, type: 'text' | 'emoji' = 'text') {
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: this.localUserId,
      userName: this.localUserName,
      message: text,
      timestamp: new Date(),
      type: type
    }
    
    // Send to all connected peers
    this.peers.forEach((peer) => {
      if (peer.dataChannel && peer.dataChannel.readyState === 'open') {
        peer.dataChannel.send(JSON.stringify(message))
      }
    })
    
    // Also trigger callback for local message
    this.onMessageCallback?.(message)
  }

  public getConnectedPeers(): Array<{id: string, userName: string}> {
    return Array.from(this.peers.values())
      .filter(peer => peer.isConnected)
      .map(peer => ({
        id: peer.id,
        userName: peer.userName
      }))
  }

  public onMessage(callback: (message: ChatMessage) => void) {
    this.onMessageCallback = callback
  }

  public onPeerConnected(callback: (peerId: string, userName: string) => void) {
    this.onPeerConnectedCallback = callback
  }

  public onPeerDisconnected(callback: (peerId: string) => void) {
    this.onPeerDisconnectedCallback = callback
  }

  public disconnect() {
    // Send leave message
    this.sendSignalingMessage({
      type: 'leave',
      data: {},
      from: this.localUserId,
      roomId: this.roomId
    })
    
    // Close all peer connections
    this.peers.forEach((peer) => {
      peer.connection.close()
    })
    
    this.peers.clear()
  }
}
