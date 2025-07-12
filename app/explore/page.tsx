import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const spaces = [
  { id: 1, name: "Neon City", creator: "CyberArchitect", visitors: 1200, image: "/placeholder.svg" },
  { id: 2, name: "Enchanted Forest", creator: "NatureMage", visitors: 980, image: "/placeholder.svg" },
  { id: 3, name: "Quantum Realm", creator: "SciFiDesigner", visitors: 1500, image: "/placeholder.svg" },
  { id: 4, name: "Retro Arcade", creator: "PixelMaster", visitors: 850, image: "/placeholder.svg" },
  { id: 5, name: "Underwater Oasis", creator: "OceanDreamer", visitors: 1100, image: "/placeholder.svg" },
  { id: 6, name: "Steampunk Workshop", creator: "GearHead", visitors: 730, image: "/placeholder.svg" },
]

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Explore Virtual Spaces
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id} className="backdrop-blur-lg bg-white/10 border-purple-500/20 overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={space.image || "/placeholder.svg"}
                alt={space.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{space.name}</CardTitle>
              <p className="text-sm text-gray-400 mb-2">Created by {space.creator}</p>
              <p className="text-sm text-purple-400">{space.visitors} visitors</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm">
                Preview
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Link href={`/virtual-space/${space.id}`}>Enter Space</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Link href="/builder">Create Your Own Space</Link>
        </Button>
      </div>
    </div>
  )
}

