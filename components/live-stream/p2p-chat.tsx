"use client"

import { useState, useEffect, useRef } from 'react'
import { WebRTCManager, ChatMessage } from '@/lib/webrtc-manager'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { 
  Send, 
  Users, 
  Wifi, 
  WifiOff, 
  MessageSquare, 
  Smile,
  Copy,
  MoreVertical
} from "lucide-react"

interface P2PChatProps {
  roomId: string
  userName: string
  className?: string
}

export function P2PChat({ roomId, userName, className = "" }: P2PChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [connectedPeers, setConnectedPeers] = useState<Array<{id: string, userName: string}>>([])
  const [isConnected, setIsConnected] = useState(false)
  const [webrtcManager, setWebrtcManager] = useState<WebRTCManager | null>(null)
  const [userId] = useState(() => 'user-' + Math.random().toString(36).substr(2, 9))
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize WebRTC manager
  useEffect(() => {
    const manager = new WebRTCManager(userId, userName, roomId)
    
    manager.onMessage((message) => {
      setMessages(prev => [...prev, message])
    })
    
    manager.onPeerConnected((peerId, peerName) => {
      setConnectedPeers(prev => [...prev, { id: peerId, userName: peerName }])
      setIsConnected(true)
      toast.success(`${peerName} joined the chat`)
      
      // Add system message
      const systemMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: 'system',
        userName: 'System',
        message: `${peerName} joined the chat`,
        timestamp: new Date(),
        type: 'system'
      }
      setMessages(prev => [...prev, systemMessage])
    })
    
    manager.onPeerDisconnected((peerId) => {
      setConnectedPeers(prev => {
        const peer = prev.find(p => p.id === peerId)
        if (peer) {
          toast.info(`${peer.userName} left the chat`)
          
          // Add system message
          const systemMessage: ChatMessage = {
            id: Date.now().toString(),
            userId: 'system',
            userName: 'System',
            message: `${peer.userName} left the chat`,
            timestamp: new Date(),
            type: 'system'
          }
          setMessages(prevMessages => [...prevMessages, systemMessage])
        }
        return prev.filter(p => p.id !== peerId)
      })
      
      if (manager.getConnectedPeers().length === 0) {
        setIsConnected(false)
      }
    })
    
    setWebrtcManager(manager)
    
    // Cleanup
    return () => {
      manager.disconnect()
    }
  }, [roomId, userName, userId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && webrtcManager) {
      webrtcManager.sendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  const handleSendEmoji = (emoji: string) => {
    if (webrtcManager) {
      webrtcManager.sendMessage(emoji, 'emoji')
    }
  }

  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message)
    toast.success('Message copied to clipboard')
  }

  const getMessageColor = (userId: string) => {
    const colors = [
      'text-purple-400',
      'text-blue-400', 
      'text-green-400',
      'text-yellow-400',
      'text-pink-400',
      'text-indigo-400',
      'text-red-400'
    ]
    const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            P2P Chat
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-1">
              {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isConnected ? 'Connected' : 'Connecting...'}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {connectedPeers.length + 1}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-4">
        {/* Connected Users */}
        {connectedPeers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Connected Users</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">
                          {userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {userName} (You)
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>That's you!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {connectedPeers.map((peer) => (
                <TooltipProvider key={peer.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Avatar className="w-4 h-4">
                          <AvatarFallback className="text-xs">
                            {peer.userName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {peer.userName}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connected via WebRTC</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages yet. Start a conversation!</p>
                <p className="text-sm mt-1">Messages are sent peer-to-peer via WebRTC</p>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`group ${message.type === 'system' ? 'text-center' : ''}`}
                >
                  {message.type === 'system' ? (
                    <div className="text-xs text-gray-400 bg-gray-800/30 rounded-full px-3 py-1 inline-block">
                      {message.message}
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">
                          {message.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium text-sm ${getMessageColor(message.userId)}`}>
                            {message.userName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 group">
                          <p className={`text-sm ${
                            message.type === 'emoji' ? 'text-2xl' : 'text-gray-200'
                          }`}>
                            {message.message}
                          </p>
                          <Button
                            onClick={() => copyMessage(message.message)}
                            size="icon"
                            variant="ghost"
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Emoji Reactions */}
        <div className="mb-4">
          <div className="flex gap-1 justify-center">
            {['👍', '❤️', '😂', '🎉', '👏', '🔥'].map((emoji) => (
              <Button
                key={emoji}
                onClick={() => handleSendEmoji(emoji)}
                size="sm"
                variant="ghost"
                className="text-lg p-1 h-8 w-8"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type a message..." : "Connecting to peers..."}
            className="flex-1"
            disabled={!isConnected}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim() || !isConnected}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        
        {!isConnected && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            Waiting for other users to join the room...
          </p>
        )}
      </CardContent>
    </Card>
  )
}
