import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover and Access University Data
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore our comprehensive collection of datasets and data products to enhance your research, teaching,
                and administrative decision-making.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="px-8 bg-contoso-orange hover:bg-contoso-orange/90">
                <Link href="/discover">Explore Data Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 border-contoso-orange text-contoso-orange hover:bg-contoso-orange/10"
              >
                <Link href="/datasets">Browse Datasets</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/university-data-analysis-main-page.jpg"
              width={700}
              height={467}
              alt="Data analyst presenting insights to colleagues"
              className="rounded-lg object-cover shadow-xl w-full h-auto max-w-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
