"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { UserButton } from "@/components/user-button"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="border-b border-purple-500/20 backdrop-blur-lg bg-black/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            VRCity
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <Link href="/explore" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`block p-3 hover:bg-purple-500/10 rounded-lg ${pathname === "/explore" ? "bg-purple-500/10" : ""}`}
                      >
                        <div className="font-medium mb-1">Virtual Spaces</div>
                        <p className="text-sm text-gray-400">Browse user-created virtual environments</p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/marketplace" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`block p-3 hover:bg-purple-500/10 rounded-lg ${pathname === "/marketplace" ? "bg-purple-500/10" : ""}`}
                      >
                        <div className="font-medium mb-1">Marketplace</div>
                        <p className="text-sm text-gray-400">Buy and sell virtual items</p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/live-stream" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`block p-3 hover:bg-purple-500/10 rounded-lg ${pathname === "/live-stream" ? "bg-purple-500/10" : ""}`}
                      >
                        <div className="font-medium mb-1">Live Streams</div>
                        <p className="text-sm text-gray-400">Watch live VR content</p>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/builder" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-500/10 focus:bg-purple-500/10 ${pathname === "/builder" ? "bg-purple-500/10" : ""}`}
                  >
                    Create
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Sign Up</Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}

