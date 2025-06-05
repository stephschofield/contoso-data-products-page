import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { PurviewService } from "@/lib/purview-service"

// Mock database of data products and datasets (existing)
const dataProducts = [
  {
    id: 1,
    title: "Student Demographics Analysis",
    type: "product",
    description: "Comprehensive breakdown of student population by various demographic factors",
    image: "/images/student-demographics.jpeg",
    link: "/discover/product/1",
    tags: ["demographics", "analytics", "enrollment"],
    keywords: ["demographics", "student", "population", "diversity", "ethnicity", "gender", "age"],
    source: "curated",
  },
  {
    id: 2,
    title: "Enrollment Analytics",
    type: "product",
    description: "Track and analyze enrollment trends, demographics, and projections",
    image: "/images/enrollment-analytics.jpeg",
    link: "/discover/product/2",
    tags: ["enrollment", "analytics", "trends"],
    keywords: ["enrollment", "trends", "registration", "admissions", "student numbers"],
    source: "curated",
  },
  {
    id: 3,
    title: "Campus Resource Utilization",
    type: "product",
    description: "Monitor usage patterns of campus facilities and resources",
    image: "/images/campus-resource-utilization.jpeg",
    link: "/discover/product/3",
    tags: ["sustainability", "operations", "utilities"],
    keywords: ["campus", "resources", "facilities", "usage", "utilization", "buildings"],
    source: "curated",
  },
  {
    id: 4,
    title: "Course Enrollment Patterns",
    type: "product",
    description: "Analysis of enrollment trends, popular courses, and scheduling optimization",
    image: "/images/course-enrollment.jpeg",
    link: "/discover/product/4",
    tags: ["courses", "enrollment", "scheduling"],
    keywords: ["courses", "enrollment", "scheduling", "popular courses", "class size", "demand"],
    source: "curated",
  },
  {
    id: 5,
    title: "Alumni Career Outcomes",
    type: "product",
    description: "Employment statistics, career paths, and success metrics for graduates",
    image: "/images/alumni-careers.jpeg",
    link: "/discover/product/5",
    tags: ["alumni", "careers", "outcomes"],
    keywords: ["alumni", "careers", "jobs", "employment", "graduates", "outcomes"],
    source: "curated",
  },
  {
    id: 6,
    title: "Library Resource Usage",
    type: "product",
    description: "Statistics on library visits, resource checkouts, and digital access",
    image: "/images/library-resource-usage.jpeg",
    link: "/discover/product/6",
    tags: ["library", "resources", "usage"],
    keywords: ["library", "books", "resources", "checkouts", "digital", "usage"],
    source: "curated",
  },
]

const datasets = [
  {
    id: 101,
    title: "Course Demand Dataset",
    type: "dataset",
    description: "Raw data on course registrations and waitlists for the past 5 years",
    tags: ["raw data", "courses", "historical"],
    keywords: ["courses", "demand", "registration", "waitlist", "historical"],
    source: "curated",
  },
  {
    id: 102,
    title: "Student Demographics Raw Data",
    type: "dataset",
    description: "Anonymized student demographic information by semester",
    tags: ["demographics", "raw data", "students"],
    keywords: ["demographics", "students", "raw data", "anonymized"],
    source: "curated",
  },
]

// Transform Purview assets to match our data structure
function transformPurviewAssets(purviewResults: any[]): any[] {
  return purviewResults.map((asset, index) => ({
    id: `purview-${asset.id || index}`,
    title: asset.displayText || asset.name || "Unnamed Asset",
    type: asset.typeName?.includes("Table") ? "dataset" : "product",
    description: asset.description || `${asset.typeName} from Microsoft Purview`,
    tags: [
      asset.typeName?.split(".").pop()?.toLowerCase() || "unknown",
      "purview",
      ...(asset.classifications?.map((c: any) => c.name.toLowerCase()) || []),
    ],
    keywords: [
      asset.displayText?.toLowerCase(),
      asset.name?.toLowerCase(),
      asset.qualifiedName?.toLowerCase(),
      asset.typeName?.toLowerCase(),
      ...(asset.classifications?.map((c: any) => c.name.toLowerCase()) || []),
    ].filter(Boolean),
    source: "purview",
    purviewId: asset.id,
    qualifiedName: asset.qualifiedName,
    typeName: asset.typeName,
    link: `/purview/asset/${asset.id}`,
  }))
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 })
    }

    // Search both curated content and Purview assets
    const [aiAnalysis, purviewAssets] = await Promise.allSettled([
      // Generate AI analysis
      generateText({
        model: openai("gpt-4o"),
        prompt: `
          You are an AI assistant for a university data platform. 
          The user has searched for: "${query}"
          
          Based on this search query, provide a brief, helpful response about what data products or datasets might be relevant.
          Keep your response under 150 words and focus on being helpful.
          
          Available data products and datasets:
          ${JSON.stringify([...dataProducts, ...datasets])}
        `,
      }),

      // Search Purview assets
      (async () => {
        try {
          const purviewService = new PurviewService()
          const purviewResults = await purviewService.searchAssets(query, 5)
          return purviewResults.value || []
        } catch (error) {
          console.error("Purview search error:", error)
          return []
        }
      })(),
    ])

    // Get AI response
    const aiResponse =
      aiAnalysis.status === "fulfilled"
        ? aiAnalysis.value.text
        : "I found some relevant data assets for your search. Browse the results below to find what you need."

    // Get Purview assets
    const purviewResults = purviewAssets.status === "fulfilled" ? purviewAssets.value : []
    const transformedPurviewAssets = transformPurviewAssets(purviewResults)

    // Combine all items for search
    const allItems = [...dataProducts, ...datasets, ...transformedPurviewAssets]
    const queryTerms = query.toLowerCase().split(/\s+/)

    // Search and score results
    const results = allItems
      .map((item) => {
        const keywordMatches = (item.keywords || []).filter((keyword: string) =>
          queryTerms.some((term) => keyword.includes(term)),
        ).length

        const titleMatches = queryTerms.filter((term) => item.title.toLowerCase().includes(term)).length * 2 // Title matches are weighted more heavily

        const descriptionMatches = queryTerms.filter((term) => item.description.toLowerCase().includes(term)).length

        // Boost curated content slightly
        const sourceBoost = item.source === "curated" ? 0.5 : 0

        const score = keywordMatches + titleMatches + descriptionMatches + sourceBoost

        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8) // Increase limit to show more results
      .map(({ item }) => item)

    return NextResponse.json({
      aiResponse,
      results,
      sources: {
        curated: results.filter((r) => r.source === "curated").length,
        purview: results.filter((r) => r.source === "purview").length,
      },
    })
  } catch (error) {
    console.error("AI search error:", error)
    return NextResponse.json({ error: "Failed to process search" }, { status: 500 })
  }
}
