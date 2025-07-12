"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Smartphone, 
  Settings,
  Users,
  Eye,
  Circle
} from "lucide-react"

interface StreamControlsProps {
  isStreaming: boolean
  isRecording: boolean
  viewerCount: number
  onStartStream: () => void
  onStopStream: () => void
  onToggleRecording: () => void
  onToggleCamera: () => void
  onToggleMic: () => void
  cameraEnabled: boolean
  micEnabled: boolean
  streamQuality: string
  onQualityChange: (quality: string) => void
}

export function StreamControls({
  isStreaming,
  isRecording,
  viewerCount,
  onStartStream,
  onStopStream,
  onToggleRecording,
  onToggleCamera,
  onToggleMic,
  cameraEnabled,
  micEnabled,
  streamQuality,
  onQualityChange
}: StreamControlsProps) {
  const [volume, setVolume] = useState([50])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Live Stream Controls
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isStreaming ? "default" : "secondary"}>
            {isStreaming ? "LIVE" : "OFFLINE"}
          </Badge>
          {isStreaming && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {viewerCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stream Control Buttons */}
        <div className="flex gap-2">
          {!isStreaming ? (
            <Button onClick={onStartStream} className="flex-1">
              Start Stream
            </Button>
          ) : (
            <Button onClick={onStopStream} variant="destructive" className="flex-1">
              Stop Stream
            </Button>
          )}
          <Button
            onClick={onToggleRecording}
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
          >
            <Circle className="w-4 h-4" />
          </Button>
        </div>

        {/* Media Controls */}
        <div className="flex gap-2">
          <Button
            onClick={onToggleCamera}
            variant={cameraEnabled ? "default" : "outline"}
            size="icon"
            className="flex-1"
          >
            {cameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
          </Button>
          <Button
            onClick={onToggleMic}
            variant={micEnabled ? "default" : "outline"}
            size="icon"
            className="flex-1"
          >
            {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Volume</label>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Quality Settings */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Stream Quality</label>
          <div className="flex gap-2">
            {["720p", "1080p", "4K"].map((quality) => (
              <Button
                key={quality}
                onClick={() => onQualityChange(quality)}
                variant={streamQuality === quality ? "default" : "outline"}
                size="sm"
              >
                {quality}
              </Button>
            ))}
          </div>
        </div>

        {/* Device Selection */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Monitor className="w-4 h-4 mr-2" />
            Screen
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
