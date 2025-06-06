import { Shield, Users, Zap, Globe, Lock, BarChart } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with FERPA compliance and role-based access controls.",
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Share insights and collaborate with colleagues across departments and colleges.",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Access up-to-date data with automated refresh cycles and live dashboards.",
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Access your data products from anywhere with our cloud-based platform.",
    },
    {
      icon: Lock,
      title: "Data Governance",
      description: "Comprehensive data lineage tracking and governance through Microsoft Purview integration.",
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Powerful analytics tools and machine learning capabilities for deeper insights.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Data Discovery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides everything you need to discover, access, and analyze university data effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-contoso-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-contoso-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
