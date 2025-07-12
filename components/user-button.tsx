"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, LogOut, User, Store } from "lucide-react"
import Link from "next/link"

export function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/virtual-space/my-space">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile & Space
          </DropdownMenuItem>
        </Link>
        <Link href="/store">
          <DropdownMenuItem>
            <Store className="mr-2 h-4 w-4" />
            My Store
          </DropdownMenuItem>
        </Link>
        <Link href="/admin/dashboard">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/log out/signout">
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

