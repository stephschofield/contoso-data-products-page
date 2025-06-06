import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-contoso-blue to-blue-700">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Unlock Your Data Potential?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of researchers, administrators, and students who are already using our platform to make
            data-driven decisions and drive innovation across the university.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-contoso-blue hover:bg-gray-100" asChild>
              <Link href="/discover">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-contoso-blue"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
