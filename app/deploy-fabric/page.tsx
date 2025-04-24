import { DeploymentSection } from "@/components/deployment-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function DeployFabricPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <DeploymentSection />
      </main>
      <Footer />
    </div>
  )
}
