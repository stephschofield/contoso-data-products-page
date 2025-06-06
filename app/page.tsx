import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedDatasets } from "@/components/featured-datasets"
import { PopularProducts } from "@/components/popular-products"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedDatasets />
        <PopularProducts />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
