import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-none px-0">
        <div className="grid gap-0 lg:grid-cols-2 min-h-[80vh]">
          <div className="flex flex-col justify-center space-y-6 px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                Discover and Access University Data
              </h1>
              <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed">
                Explore our comprehensive collection of datasets and data products to enhance your research, teaching,
                and administrative decision-making.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button asChild size="lg" className="px-10 py-6 text-lg bg-contoso-orange hover:bg-contoso-orange/90">
                <Link href="/discover">Explore Data Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg border-contoso-orange text-contoso-orange hover:bg-contoso-orange/10"
              >
                <Link href="/datasets">Browse Datasets</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full h-full relative min-h-[500px] lg:min-h-[80vh]">
              <Image
                src="/images/university-data-analysis-main-page.jpg"
                fill
                alt="University data analysis presentation"
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
