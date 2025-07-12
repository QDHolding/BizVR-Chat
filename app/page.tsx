import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Sparkles, Globe2, ShoppingBag } from "lucide-react"

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Welcome to VRCity
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create, showcase, and monetize your virtual spaces in the next generation of social commerce
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 backdrop-blur-lg bg-white/10 border-purple-500/20">
          <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Create Your Space</h3>
          <p className="text-gray-300 mb-4">Design your perfect virtual environment with our intuitive VR builder</p>
          <Link href="/get-started">
            <Button className="w-full">
              Start Building
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/10 border-purple-500/20">
          <Globe2 className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Go Live</h3>
          <p className="text-gray-300 mb-4">Stream your content and engage with your audience in real-time</p>
          <Link href="/live-stream">
            <Button className="w-full">
              Start Streaming
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/10 border-purple-500/20">
          <ShoppingBag className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Marketplace</h3>
          <p className="text-gray-300 mb-4">Discover and purchase unique virtual items and spaces</p>
          <Link href="/marketplace">
            <Button className="w-full">
              Browse Market
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20"></div>
        <Card className="relative backdrop-blur-lg bg-white/10 border-purple-500/20 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-gray-300 mb-6">
                Join VRCity today and start creating your virtual empire. Connect with customers, showcase your
                products, and grow your business in VR.
              </p>
              <Link href="/get-started">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
              {/* Preview video or animation would go here */}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

