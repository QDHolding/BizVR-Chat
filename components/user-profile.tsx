"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"

interface UserProfileProps {
  username?: string
  level?: number
  spaces?: number
  followers?: number
  avatarUrl?: string
  currentSpace?: string
  isClickable?: boolean
}

export function UserProfile({
  username = "User",
  level = 1,
  spaces = 0,
  followers = 0,
  avatarUrl = "/placeholder.svg",
  currentSpace = "Home Space",
  isClickable = true,
}: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!isClickable) return <>{children}</>

    return <div className="transition-transform hover:scale-105">{children}</div>
  }

  return (
    <CardWrapper>
      <Card className="w-64 backdrop-blur-lg bg-black/40 border-purple-500/20 text-white">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-12 w-12 border-2 border-purple-500">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{username}</CardTitle>
            <Badge variant="secondary" className="bg-purple-500/20">
              Level {level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="text-gray-300">{currentSpace}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{spaces} spaces</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{followers} followers</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant={isFollowing ? "outline" : "default"}
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault()
                  setIsFollowing(!isFollowing)
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Link href={`/messages/${username}`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full" onClick={(e) => e.stopPropagation()}>
                  Message
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}

