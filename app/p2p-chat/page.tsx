"use client"

import { useState } from 'react'
import { P2PChat } from '@/components/live-stream/p2p-chat'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Users, 
  Settings, 
  Share2,
  Globe,
  Lock,
  Copy
} from "lucide-react"
import Link from "next/link"

export default function P2PChatPage() {
  const [roomId, setRoomId] = useState('public-room')
  const [userName, setUserName] = useState('')
  const [isInRoom, setIsInRoom] = useState(false)
  const [customRoom, setCustomRoom] = useState('')

  const handleJoinRoom = () => {
    if (userName.trim()) {
      setIsInRoom(true)
    }
  }

  const handleCreateRoom = () => {
    if (userName.trim() && customRoom.trim()) {
      setRoomId(customRoom)
      setIsInRoom(true)
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    // You could add a toast notification here
  }

  const shareRoom = () => {
    const url = `${window.location.origin}/p2p-chat?room=${roomId}`
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  if (isInRoom) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">P2P Chat Room</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {roomId}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {userName}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyRoomId} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy Room ID
              </Button>
              <Button onClick={shareRoom} variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Room
              </Button>
              <Button onClick={() => setIsInRoom(false)} variant="outline" size="sm">
                Leave Room
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <P2PChat 
                roomId={roomId} 
                userName={userName}
                className="h-[700px]"
              />
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Room Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Room ID</label>
                    <div className="flex gap-2">
                      <Input value={roomId} readOnly className="flex-1" />
                      <Button onClick={copyRoomId} size="icon" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input value={userName} readOnly />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">How P2P Chat Works</h4>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>• Direct peer-to-peer connections</p>
                      <p>• No server storing messages</p>
                      <p>• End-to-end encrypted</p>
                      <p>• Works across devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/virtual-space" className="block">
                    <Button variant="outline" className="w-full">
                      <Globe className="w-4 h-4 mr-2" />
                      Join VR Space
                    </Button>
                  </Link>
                  <Link href="/live-stream" className="block">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Live Stream
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h1 className="text-4xl font-bold mb-4">P2P Chat</h1>
          <p className="text-gray-400 mb-8">
            Connect directly with other users using peer-to-peer technology. 
            No servers, no data storage, just direct encrypted communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Join Public Room */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Join Public Room
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Room</label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">public-room</Badge>
                  <span className="text-sm text-gray-400">Open to everyone</span>
                </div>
              </div>

              <Button 
                onClick={handleJoinRoom} 
                disabled={!userName.trim()}
                className="w-full"
              >
                Join Public Room
              </Button>
            </CardContent>
          </Card>

          {/* Create Private Room */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Create Private Room
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Room Name</label>
                <Input 
                  value={customRoom}
                  onChange={(e) => setCustomRoom(e.target.value)}
                  placeholder="Enter room name"
                />
              </div>

              <Button 
                onClick={handleCreateRoom} 
                disabled={!userName.trim() || !customRoom.trim()}
                className="w-full"
                variant="outline"
              >
                Create Private Room
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-gray-800/30">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="font-medium mb-1">End-to-End Encrypted</h4>
              <p className="text-gray-400">Messages are encrypted between peers</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="font-medium mb-1">No Server Storage</h4>
              <p className="text-gray-400">Messages never touch our servers</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-medium mb-1">Direct Connection</h4>
              <p className="text-gray-400">Connect directly with other users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
