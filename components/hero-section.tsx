import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Deploy Fabric Platform with Ease
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Simplify your Fabric deployment with our intuitive platform. Choose between Terraform or Bicep based on
                your team's preference.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8 bg-contoso-orange hover:bg-contoso-orange/90">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-contoso-orange text-contoso-orange hover:bg-contoso-orange/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Fabric Platform Deployment"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
