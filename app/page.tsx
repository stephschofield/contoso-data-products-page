import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedDatasets } from "@/components/featured-datasets"
import { PopularProducts } from "@/components/popular-products"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FeaturedDatasets />
        <PopularProducts />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
