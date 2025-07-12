"use client"

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Users,
  Heart,
  MessageSquare
} from "lucide-react"

interface VideoPlayerProps {
  stream?: MediaStream
  isLocal?: boolean
  userName?: string
  isLive?: boolean
  viewerCount?: number
  onLike?: () => void
  onComment?: () => void
  className?: string
}

export function VideoPlayer({
  stream,
  isLocal = false,
  userName = "Anonymous",
  isLive = false,
  viewerCount = 0,
  onLike,
  onComment,
  className = ""
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }
  }, [stream])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="aspect-video bg-black relative group">
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal} // Always mute local video to prevent feedback
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={togglePlayPause}
                size="icon"
                variant="ghost"
                className="bg-black/40 hover:bg-black/60"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                onClick={toggleMute}
                size="icon"
                variant="ghost"
                className="bg-black/40 hover:bg-black/60"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleFullscreen}
                size="icon"
                variant="ghost"
                className="bg-black/40 hover:bg-black/60"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stream Info Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={isLive ? "default" : "secondary"}>
              {isLive ? "LIVE" : "OFFLINE"}
            </Badge>
            <Badge variant="outline" className="bg-black/40 text-white">
              {userName}
            </Badge>
          </div>
          
          {isLive && (
            <Badge variant="outline" className="bg-black/40 text-white flex items-center gap-1">
              <Users className="w-3 h-3" />
              {viewerCount}
            </Badge>
          )}
        </div>

        {/* Interaction Buttons */}
        {!isLocal && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              onClick={onLike}
              size="icon"
              variant="ghost"
              className="bg-black/40 hover:bg-black/60"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              onClick={onComment}
              size="icon"
              variant="ghost"
              className="bg-black/40 hover:bg-black/60"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
