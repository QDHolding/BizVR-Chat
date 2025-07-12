"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"


const Scene = dynamic(() => import("@/components/scene"), { ssr: false })

export default function VirtualSpacePage({ params }: { params: { id: string } }) {
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
    </div>
  )
}

