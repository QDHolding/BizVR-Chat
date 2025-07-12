import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
            <Navigation />
            {children}
            <Toaster />
            <Sonner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Biz VR - Virtual Conference',
  description: 'Virtual Reality Conference and Chat Platform'
}
