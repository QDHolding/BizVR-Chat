"use client"

import { useState } from "react"
import { StreamManager } from "@/components/live-stream/stream-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Camera, 
  Users, 
  Play, 
  Smartphone, 
  Monitor,
  Wifi,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function LiveStreamPage() {
  const [activeTab, setActiveTab] = useState("watch")
  const [isStreamer, setIsStreamer] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live Streams</h1>
            <p className="text-gray-400">
              Watch and broadcast live from VR spaces around the world
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Connected
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {Math.floor(Math.random() * 1000) + 100} Online
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="watch" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch Streams
            </TabsTrigger>
            <TabsTrigger value="stream" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Start Streaming
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile Stream
            </TabsTrigger>
          </TabsList>

          <TabsContent value="watch" className="mt-6">
            <StreamManager 
              isStreamer={false}
              streamId="main-stream"
            />
          </TabsContent>

          <TabsContent value="stream" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Desktop Streaming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    Stream directly from your computer with high quality video and audio
                  </p>
                  <Button 
                    onClick={() => setIsStreamer(true)}
                    className="w-full"
                  >
                    Start Desktop Stream
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Mobile Streaming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    Stream from your phone or tablet on the go
                  </p>
                  <Button variant="outline" className="w-full">
                    Open Mobile Stream
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Advanced Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    Configure streaming settings and quality options
                  </p>
                  <Link href="/settings/streaming">
                    <Button variant="outline" className="w-full">
                      Stream Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {isStreamer && (
              <StreamManager 
                isStreamer={true}
                streamId="user-stream"
                onStreamStart={(id) => console.log("Stream started:", id)}
                onStreamEnd={() => console.log("Stream ended")}
              />
            )}
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            <div className="text-center py-12">
              <Smartphone className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-2xl font-bold mb-4">Mobile Streaming</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Download our mobile app to stream directly from your phone or tablet. 
                Perfect for on-the-go content creation and sharing your VR experiences.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">
                  Download iOS App
                </Button>
                <Button size="lg" variant="outline">
                  Download Android App
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

