import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 bg-contoso-orange text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Explore University Data?</h2>
            <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our data community and discover insights that can transform your research and decision-making.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="px-8 bg-white text-contoso-orange hover:bg-white/90">
              <Link href="/discover">Explore Data Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/10">
              <Link href="/documentation">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
