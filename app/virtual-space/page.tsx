"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const Scene = dynamic(() => import("@/components/scene"), { ssr: false })

export default function VirtualSpacePage() {
  return (
    <div className="w-full h-screen relative">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        }
      >
        <Scene />
      </Suspense>

      {/* Overlay UI */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href="/invite">
          <Button variant="secondary">Invite Friends</Button>
        </Link>
        <Link href="/customize">
          <Button>Customize Space</Button>
        </Link>
      </div>

      {/* Chat Panel */}
      <Card className="absolute bottom-4 right-4 w-80 h-96 p-4 bg-background/80 backdrop-blur-sm">
        <div className="font-semibold mb-2">Chat</div>
        <div className="h-[calc(100%-80px)] overflow-y-auto mb-2">{/* Chat messages would go here */}</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-md px-3 py-1.5 bg-background border"
          />
          <Button size="sm">Send</Button>
        </div>
      </Card>
    </div>
  )
}

