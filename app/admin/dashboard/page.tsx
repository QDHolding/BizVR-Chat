"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Jan", users: 4000, sales: 2400, amt: 2400 },
  { name: "Feb", users: 3000, sales: 1398, amt: 2210 },
  { name: "Mar", users: 2000, sales: 9800, amt: 2290 },
  { name: "Apr", users: 2780, sales: 3908, amt: 2000 },
  { name: "May", users: 1890, sales: 4800, amt: 2181 },
  { name: "Jun", users: 2390, sales: 3800, amt: 2500 },
  { name: "Jul", users: 3490, sales: 4300, amt: 2100 },
]

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="backdrop-blur-lg bg-white/10 border-purple-500/20">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,234</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/10 border-purple-500/20">
          <CardHeader>
            <CardTitle>Active Spaces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,423</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/10 border-purple-500/20">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$52,389</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/10 border-purple-500/20">
          <CardHeader>
            <CardTitle>Live Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">37</p>
          </CardContent>
        </Card>
      </div>
      <Card className="backdrop-blur-lg bg-white/10 border-purple-500/20">
        <CardHeader>
          <CardTitle>User Growth and Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-center">
        <Link href="/admin/reports">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
            View Detailed Reports
          </Button>
        </Link>
      </div>
    </div>
  )
}

