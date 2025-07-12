"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowRight, Store, Users, Rocket } from "lucide-react"

const steps = [
  {
    title: "Welcome to VRCity",
    description: "Let's set up your virtual business presence.",
    icon: <Rocket className="w-12 h-12 text-purple-500" />,
    fields: [
      { name: "businessName", label: "Business Name", type: "text" },
      {
        name: "category",
        label: "Business Category",
        type: "select",
        options: ["Retail", "Services", "Entertainment", "Education", "Other"],
      },
    ],
  },
  {
    title: "Create Your Space",
    description: "Design your virtual storefront or showcase area.",
    icon: <Store className="w-12 h-12 text-purple-500" />,
    fields: [
      {
        name: "spaceTheme",
        label: "Space Theme",
        type: "select",
        options: ["Modern", "Futuristic", "Natural", "Fantasy", "Minimalist"],
      },
      { name: "spaceDescription", label: "Space Description", type: "textarea" },
    ],
  },
  {
    title: "Connect with Customers",
    description: "Set up your customer engagement preferences.",
    icon: <Users className="w-12 h-12 text-purple-500" />,
    fields: [
      { name: "welcomeMessage", label: "Welcome Message", type: "textarea" },
      {
        name: "communicationPreference",
        label: "Preferred Communication",
        type: "select",
        options: ["Chat", "Voice", "Video", "All"],
      },
    ],
  },
]

export function OnboardingSequence() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Here you would typically send the formData to your backend
      console.log("Onboarding complete:", formData)
      // Redirect to the user's new space
      router.push("/virtual-space/my-space")
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      <Card className="w-[450px] backdrop-blur-lg bg-white/10 border-purple-500/20">
        <CardHeader>
          <div className="flex justify-center mb-4">{currentStepData.icon}</div>
          <CardTitle className="text-2xl text-center text-white">{currentStepData.title}</CardTitle>
          <CardDescription className="text-center text-gray-300">{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            {currentStepData.fields.map((field) => (
              <div key={field.name} className="mb-4">
                <Label htmlFor={field.name} className="text-white">
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <Select onValueChange={(value) => handleInputChange(field.name, value)}>
                    <SelectTrigger className="bg-white/10 border-purple-500/20 text-white">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    className="bg-white/10 border-purple-500/20 text-white"
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    className="bg-white/10 border-purple-500/20 text-white"
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} className="w-full">
            {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

