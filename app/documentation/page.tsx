import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  BookOpen,
  Code,
  Youtube,
  Github,
  ExternalLink,
  PlayCircle,
  FileCode2,
  Braces,
  Server,
  Database,
  Globe,
  Search,
  Lightbulb,
  MessageSquare,
} from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-contoso-blue text-white">
          <div className="container px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <h1 className="text-4xl md:text-5xl font-bold">Documentation</h1>
              </div>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Everything you need to know about deploying Azure resources with our platform
              </p>

              <div className="relative max-w-xl">
                <input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full px-5 py-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute right-4 top-4 h-6 w-6 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container px-4 py-12">
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="getting-started" className="flex items-center gap-2 py-3">
                <Lightbulb className="h-4 w-4" />
                <span>Getting Started</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2 py-3">
                <Server className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2 py-3">
                <PlayCircle className="h-4 w-4" />
                <span>Tutorials</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2 py-3">
                <Code className="h-4 w-4" />
                <span>API Reference</span>
              </TabsTrigger>
            </TabsList>

            {/* Getting Started Tab */}
            <TabsContent value="getting-started">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Getting Started with Azure Resource Deployment</h2>
                    <p className="text-gray-600 mb-6">
                      Our platform simplifies the process of deploying Azure resources using Infrastructure as Code
                      (IaC). Whether you prefer Terraform or Bicep, we've got you covered with streamlined workflows and
                      best practices.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <FileCode2 className="h-5 w-5 text-primary" />
                            Terraform Deployment
                          </CardTitle>
                          <CardDescription>Deploy using HashiCorp Terraform</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Use Terraform to deploy and manage your Azure resources with a powerful, multi-cloud
                            compatible IaC tool.
                          </p>
                          <Button asChild>
                            <Link href="/deploy-azure-resources?method=terraform">Get Started with Terraform</Link>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <Braces className="h-5 w-5 text-primary" />
                            Bicep Deployment
                          </CardTitle>
                          <CardDescription>Deploy using Microsoft Bicep</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Use Bicep to deploy and manage your Azure resources with a native Azure IaC language that's
                            simpler than ARM templates.
                          </p>
                          <Button asChild>
                            <Link href="/deploy-azure-resources?method=bicep">Get Started with Bicep</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Quick Start Guide</h3>
                    <ol className="list-decimal list-inside space-y-4 text-gray-600 mb-6">
                      <li>
                        <span className="font-medium text-gray-900">Choose your deployment method</span> - Select either
                        Terraform or Bicep based on your team's expertise and requirements.
                      </li>
                      <li>
                        <span className="font-medium text-gray-900">Select your resource type</span> - Choose between
                        Fabric resources or general Azure resources.
                      </li>
                      <li>
                        <span className="font-medium text-gray-900">Configure your deployment</span> - Provide the
                        necessary configuration details for your resources.
                      </li>
                      <li>
                        <span className="font-medium text-gray-900">Review and deploy</span> - Verify your configuration
                        and initiate the deployment process.
                      </li>
                      <li>
                        <span className="font-medium text-gray-900">Monitor deployment</span> - Track the progress of
                        your deployment in real-time.
                      </li>
                    </ol>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                        Pro Tips
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>
                          Use our pre-configured templates to speed up your deployment process for common scenarios.
                        </li>
                        <li>
                          Check out our YouTube tutorials for step-by-step guidance on complex deployment scenarios.
                        </li>
                        <li>Leverage our GitHub repository for sample code and community-contributed templates.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <Youtube className="h-5 w-5 text-red-600" />
                            Video Tutorials
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Watch our comprehensive video tutorials on the Tiger Team YouTube channel.
                          </p>
                          <Button variant="outline" className="w-full" asChild>
                            <a
                              href="https://www.youtube.com/@MicrosoftISD"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <Youtube className="h-4 w-4" />
                              Tiger Team | Microsoft ISD
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <Github className="h-5 w-5" />
                            GitHub Repository
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Access our open-source code, sample templates, and contribute to our project.
                          </p>
                          <Button variant="outline" className="w-full" asChild>
                            <a
                              href="https://github.com/microsoft/cloud-fabric-deployment"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <Github className="h-4 w-4" />
                              GitHub Repository
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Interactive Landing Page</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Explore our interactive landing page for a visual overview of our platform's capabilities.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href="https://contoso-data-products.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Landing Page
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Documentation Updates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">Azure Resource Templates</h4>
                          <Badge>New</Badge>
                        </div>
                        <p className="text-xs text-gray-600">Added new templates for common Azure resources</p>
                      </div>
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">Bicep Integration</h4>
                          <Badge variant="outline">Updated</Badge>
                        </div>
                        <p className="text-xs text-gray-600">Improved Bicep deployment workflow</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">Terraform Modules</h4>
                          <Badge variant="outline">Updated</Badge>
                        </div>
                        <p className="text-xs text-gray-600">Added new Terraform modules for Fabric resources</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Submit Feedback
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Resource Types</h2>
                    <p className="text-gray-600 mb-6">
                      Our platform supports deployment of various Azure resources. Below are the main categories of
                      resources you can deploy.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-primary" />
                            Fabric Resources
                          </CardTitle>
                          <CardDescription>Microsoft Fabric analytics resources for your data platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Available Resources</h4>
                              <ul className="grid grid-cols-2 gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Workspaces</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Lakehouses</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Warehouses</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">KQL Databases</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Semantic Models</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Pipelines</Badge>
                                </li>
                              </ul>
                            </div>

                            <Button asChild>
                              <Link href="/deploy-azure-resources?type=fabric">Deploy Fabric Resources</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-primary" />
                            Azure Resources
                          </CardTitle>
                          <CardDescription>General Azure resources for your cloud infrastructure</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Available Resources</h4>
                              <ul className="grid grid-cols-2 gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Virtual Machines</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Storage Accounts</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Virtual Networks</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">App Services</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">SQL Databases</Badge>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Badge variant="outline">Key Vaults</Badge>
                                </li>
                              </ul>
                            </div>

                            <Button asChild>
                              <Link href="/deploy-azure-resources?type=azure">Deploy Azure Resources</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Resource Templates</h2>
                    <p className="text-gray-600 mb-6">
                      Get started quickly with our pre-configured templates for common deployment scenarios.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Data Analytics Platform</CardTitle>
                          <CardDescription>Complete Fabric analytics environment</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Deploy a comprehensive data analytics platform with workspaces, lakehouses, and warehouses.
                          </p>
                          <div className="flex justify-between">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <FileCode2 className="h-3 w-3" />
                              Terraform
                            </Badge>
                            <Button size="sm">Use Template</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Web Application Stack</CardTitle>
                          <CardDescription>Full web application infrastructure</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Deploy a complete web application stack with App Service, SQL Database, and Storage Account.
                          </p>
                          <div className="flex justify-between">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Braces className="h-3 w-3" />
                              Bicep
                            </Badge>
                            <Button size="sm">Use Template</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Featured Videos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative aspect-video rounded-md overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=200&width=320&text=Fabric+Deployment+Tutorial"
                            alt="Fabric Deployment Tutorial"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-3">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium">Fabric Deployment Tutorial</h4>
                        <p className="text-xs text-gray-600">Learn how to deploy Fabric resources</p>
                      </div>

                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href="https://www.youtube.com/@MicrosoftISD"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Youtube className="h-4 w-4" />
                          View More Videos
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Resource Documentation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">Fabric Workspaces</h4>
                        <p className="text-xs text-gray-600">Documentation for Fabric workspace deployment</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          Read More
                        </Button>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">Azure Virtual Networks</h4>
                        <p className="text-xs text-gray-600">Documentation for virtual network deployment</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          Read More
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Storage Accounts</h4>
                        <p className="text-xs text-gray-600">Documentation for storage account deployment</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Video Tutorials</h2>
                    <p className="text-gray-600 mb-6">
                      Learn how to use our platform with step-by-step video tutorials from the Tiger Team.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <div className="relative aspect-video rounded-md overflow-hidden border">
                          <Image
                            src="/placeholder.svg?height=200&width=320&text=Getting+Started"
                            alt="Getting Started with Azure Resource Deployment"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-3">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-lg">Getting Started with Azure Resource Deployment</h3>
                        <p className="text-sm text-gray-600">
                          Learn the basics of deploying Azure resources using our platform
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>10:25</span>
                          <span>•</span>
                          <span>Tiger Team | Microsoft ISD</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative aspect-video rounded-md overflow-hidden border">
                          <Image
                            src="/placeholder.svg?height=200&width=320&text=Terraform+Tutorial"
                            alt="Terraform Deployment Tutorial"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-3">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-lg">Terraform Deployment Tutorial</h3>
                        <p className="text-sm text-gray-600">Learn how to deploy Azure resources using Terraform</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>15:42</span>
                          <span>•</span>
                          <span>Tiger Team | Microsoft ISD</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button asChild>
                        <a
                          href="https://www.youtube.com/@MicrosoftISD"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Youtube className="h-4 w-4" />
                          Visit Tiger Team YouTube Channel
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Step-by-Step Guides</h2>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Deploying a Fabric Workspace</CardTitle>
                          <CardDescription>Learn how to deploy a Fabric workspace using Terraform</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              This guide will walk you through the process of deploying a Microsoft Fabric workspace
                              using Terraform. You'll learn how to configure the workspace, set up permissions, and
                              deploy it to your Azure subscription.
                            </p>
                            <Button>Read Guide</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Setting Up a Web Application Stack</CardTitle>
                          <CardDescription>Learn how to deploy a web application stack using Bicep</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              This guide will walk you through the process of deploying a complete web application stack
                              using Bicep. You'll learn how to set up an App Service, SQL Database, and Storage Account
                              for your web application.
                            </p>
                            <Button>Read Guide</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Interactive Landing Page</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Explore our interactive landing page for a visual overview of our platform's capabilities.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href="https://contoso-data-products.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Landing Page
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">GitHub Repository</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Access our open-source code, sample templates, and contribute to our project.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href="https://github.com/microsoft/cloud-fabric-deployment"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          GitHub Repository
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Related Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">Microsoft Fabric Documentation</h4>
                        <p className="text-xs text-gray-600">Official Microsoft documentation for Fabric</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild>
                          <a href="https://learn.microsoft.com/en-us/fabric/" target="_blank" rel="noopener noreferrer">
                            Visit Documentation
                          </a>
                        </Button>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">Azure Documentation</h4>
                        <p className="text-xs text-gray-600">Official Microsoft documentation for Azure</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild>
                          <a href="https://learn.microsoft.com/en-us/azure/" target="_blank" rel="noopener noreferrer">
                            Visit Documentation
                          </a>
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Terraform Documentation</h4>
                        <p className="text-xs text-gray-600">Official HashiCorp documentation for Terraform</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild>
                          <a href="https://www.terraform.io/docs" target="_blank" rel="noopener noreferrer">
                            Visit Documentation
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* API Reference Tab */}
            <TabsContent value="api">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">API Reference</h2>
                    <p className="text-gray-600 mb-6">
                      Our platform provides a comprehensive API for programmatic access to deployment functionality.
                      Below is the reference documentation for our API endpoints.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Deployment API</CardTitle>
                          <CardDescription>API endpoints for managing deployments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-b pb-4">
                              <h4 className="font-medium mb-2">GET /api/deployments</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Retrieve a list of all deployments for the authenticated user.
                              </p>
                              <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                                GET https://api.contoso-data-products.com/api/deployments
                              </div>
                            </div>

                            <div className="border-b pb-4">
                              <h4 className="font-medium mb-2">POST /api/deployments</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Create a new deployment with the specified configuration.
                              </p>
                              <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                                POST https://api.contoso-data-products.com/api/deployments
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">GET /api/deployments/{"{id}"}</h4>
                              <p className="text-sm text-gray-600 mb-2">Retrieve details for a specific deployment.</p>
                              <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                                GET https://api.contoso-data-products.com/api/deployments/123
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Templates API</CardTitle>
                          <CardDescription>API endpoints for managing deployment templates</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-b pb-4">
                              <h4 className="font-medium mb-2">GET /api/templates</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Retrieve a list of all available deployment templates.
                              </p>
                              <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                                GET https://api.contoso-data-products.com/api/templates
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">GET /api/templates/{"{id}"}</h4>
                              <p className="text-sm text-gray-600 mb-2">Retrieve details for a specific template.</p>
                              <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                                GET https://api.contoso-data-products.com/api/templates/fabric-workspace
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">API Authentication</h2>
                    <Card>
                      <CardHeader>
                        <CardTitle>Authentication</CardTitle>
                        <CardDescription>How to authenticate with our API</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Our API uses OAuth 2.0 for authentication. You'll need to obtain an access token from our
                            authentication service before making API requests.
                          </p>

                          <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Example Request</h4>
                            <pre className="text-sm font-mono overflow-x-auto p-2 bg-gray-100 rounded">
                              {`curl -X POST https://api.contoso-data-products.com/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
  }'`}
                            </pre>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Example Response</h4>
                            <pre className="text-sm font-mono overflow-x-auto p-2 bg-gray-100 rounded">
                              {`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`}
                            </pre>
                          </div>

                          <p className="text-sm text-gray-600">
                            Include the access token in the Authorization header of your API requests:
                          </p>

                          <pre className="text-sm font-mono overflow-x-auto p-2 bg-gray-100 rounded">
                            {`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">API SDKs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">JavaScript SDK</h4>
                        <p className="text-xs text-gray-600">Official JavaScript SDK for our API</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          View Documentation
                        </Button>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-1">Python SDK</h4>
                        <p className="text-xs text-gray-600">Official Python SDK for our API</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          View Documentation
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">.NET SDK</h4>
                        <p className="text-xs text-gray-600">Official .NET SDK for our API</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          View Documentation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">API Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        API Reference Guide
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Sample Code
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Contact API Support
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Report API Issue
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
