import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const products = [
  { id: 1, name: "VR Headset", price: 299, image: "/placeholder.svg" },
  { id: 2, name: "3D Model Pack", price: 49, image: "/placeholder.svg" },
  { id: 3, name: "Virtual Space Theme", price: 29, image: "/placeholder.svg" },
  { id: 4, name: "Avatar Customization", price: 19, image: "/placeholder.svg" },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        VRCity Marketplace
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="backdrop-blur-lg bg-white/10 border-purple-500/20">
            <CardHeader>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-2xl font-bold text-purple-400">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/marketplace/product/${product.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

