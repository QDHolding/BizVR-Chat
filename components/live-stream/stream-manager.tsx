"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { VideoPlayer } from './video-player'
import { StreamControls } from './stream-controls'
import { P2PChat } from './p2p-chat'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  Users, 
  Share2,
  ExternalLink
} from "lucide-react"



interface StreamManagerProps {
  isStreamer?: boolean
  streamId?: string
  onStreamStart?: (streamId: string) => void
  onStreamEnd?: () => void
}

export function StreamManager({ 
  isStreamer = false, 
  streamId,
  onStreamStart,
  onStreamEnd 
}: StreamManagerProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map())
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [streamQuality, setStreamQuality] = useState('1080p')
  const [viewerCount, setViewerCount] = useState(0)
  const [userName] = useState('User' + Math.floor(Math.random() * 1000))

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const peersRef = useRef<Map<string, any>>(new Map())

  // Get user media
  const getUserMedia = useCallback(async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: streamQuality === '4K' ? 3840 : streamQuality === '1080p' ? 1920 : 1280 },
          height: { ideal: streamQuality === '4K' ? 2160 : streamQuality === '1080p' ? 1080 : 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setLocalStream(stream)
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      
      toast.success("Camera and microphone access granted!")
      return stream
    } catch (error) {
      console.error('Error accessing media devices:', error)
      toast.error("Failed to access camera or microphone")
      return null
    }
  }, [streamQuality])

  // Screen sharing
  const getScreenShare = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: true
      })
      
      setLocalStream(stream)
      toast.success("Screen sharing started!")
      return stream
    } catch (error) {
      console.error('Error sharing screen:', error)
      toast.error("Failed to share screen")
      return null
    }
  }, [])

  // Start streaming
  const handleStartStream = useCallback(async () => {
    if (!localStream) {
      await getUserMedia()
    }
    
    setIsStreaming(true)
    setViewerCount(Math.floor(Math.random() * 50) + 1) // Simulate viewer count
    onStreamStart?.(streamId || 'stream-' + Date.now())
    toast.success("Stream started!")
  }, [localStream, getUserMedia, onStreamStart, streamId])

  // Stop streaming
  const handleStopStream = useCallback(() => {
    setIsStreaming(false)
    setViewerCount(0)
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }
    
    onStreamEnd?.()
    toast.success("Stream stopped!")
  }, [localStream, onStreamEnd])

  // Toggle recording
  const handleToggleRecording = useCallback(() => {
    setIsRecording(!isRecording)
    toast.success(isRecording ? "Recording stopped" : "Recording started")
  }, [isRecording])

  // Toggle camera
  const handleToggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !cameraEnabled
        setCameraEnabled(!cameraEnabled)
      }
    }
  }, [localStream, cameraEnabled])

  // Toggle microphone
  const handleToggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !micEnabled
        setMicEnabled(!micEnabled)
      }
    }
  }, [localStream, micEnabled])



  // Share stream
  const handleShareStream = useCallback(() => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Stream URL copied to clipboard!")
  }, [])

  // Initialize
  useEffect(() => {
    if (isStreamer) {
      getUserMedia()
    }
  }, [isStreamer, getUserMedia])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Area */}
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer
          stream={localStream || undefined}
          isLocal={isStreamer}
          userName={userName}
          isLive={isStreaming}
          viewerCount={viewerCount}
          className="w-full"
        />
        
        {/* Stream Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {isStreamer ? "Your Stream" : "Live from VR Central"}
            </h2>
            <p className="text-gray-400">
              {isStreaming ? "Broadcasting live" : "Stream offline"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleShareStream} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in VR
            </Button>
          </div>
        </div>

        {/* Stream Controls (for streamers) */}
        {isStreamer && (
          <StreamControls
            isStreaming={isStreaming}
            isRecording={isRecording}
            viewerCount={viewerCount}
            onStartStream={handleStartStream}
            onStopStream={handleStopStream}
            onToggleRecording={handleToggleRecording}
            onToggleCamera={handleToggleCamera}
            onToggleMic={handleToggleMic}
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
            streamQuality={streamQuality}
            onQualityChange={setStreamQuality}
          />
        )}
      </div>

      {/* P2P Chat Sidebar */}
      <div className="space-y-4">
        <P2PChat 
          roomId={streamId || 'default-room'} 
          userName={userName}
          className="h-[600px]"
        />
      </div>
    </div>
  )
}
