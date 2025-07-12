"use client"


import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Menu, Settings, MessageSquare, Users, Compass, Package, Shield, Camera } from "lucide-react"
import { UserProfile } from "./user-profile"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ActionButton {
  icon: React.ReactNode
  label: string
  onClick: () => void
  shortcut?: string
}

export function VirtualSpaceUI() {
  const actionButtons: ActionButton[] = [
    { icon: <Shield className="w-6 h-6" />, label: "Defense", onClick: () => console.log("Defense"), shortcut: "1" },
    {
      icon: <Camera className="w-6 h-6" />,
      label: "Screenshot",
      onClick: () => console.log("Screenshot"),
      shortcut: "P",
    },
    { icon: <Compass className="w-6 h-6" />, label: "Navigate", onClick: () => console.log("Navigate"), shortcut: "N" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60">
              <Menu className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/explore">
              <DropdownMenuItem>Explore Spaces</DropdownMenuItem>
            </Link>
            <Link href="/marketplace">
              <DropdownMenuItem>Marketplace</DropdownMenuItem>
            </Link>
            <Link href="/live-stream">
              <DropdownMenuItem>Live Streams</DropdownMenuItem>
            </Link>
            <Link href="/p2p-chat">
              <DropdownMenuItem>P2P Chat</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/messages">
          <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60">
            <MessageSquare className="w-5 h-5" />
          </Button>
        </Link>

        <Link href="/friends">
          <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60">
            <Users className="w-5 h-5" />
          </Button>
        </Link>

        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60">
            <Settings className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Level Badge */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <Card className="bg-black/40 border-purple-500/20 px-3 py-1">
          <span className="text-white">Lvl 2</span>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-auto">
        <TooltipProvider>
          {actionButtons.map((button, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60" onClick={button.onClick}>
                  {button.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>
                  {button.label} {button.shortcut && `(${button.shortcut})`}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Inventory */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <Link href="/inventory">
          <Button variant="ghost" size="icon" className="bg-black/40 hover:bg-black/60">
            <Package className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="absolute top-16 right-4 pointer-events-auto">
        <Link href="/virtual-space/my-space">
          <UserProfile username="VRExplorer" level={2} spaces={5} followers={120} currentSpace="Floating Islands" />
        </Link>
      </div>
    </div>
  )
}

