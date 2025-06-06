import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Mock database of data products and datasets
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
  },
  {
    id: 102,
    title: "Student Demographics Raw Data",
    type: "dataset",
    description: "Anonymized student demographic information by semester",
    tags: ["demographics", "raw data", "students"],
    keywords: ["demographics", "students", "raw data", "anonymized"],
  },
]

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 })
    }

    // Use AI to analyze the query and find relevant results
    const { text: aiAnalysis } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are an AI assistant for a university data platform. 
        The user has searched for: "${query}"
        
        Based on this search query, provide a brief, helpful response about what data products or datasets might be relevant.
        Keep your response under 150 words and focus on being helpful.
        
        Available data products and datasets:
        ${JSON.stringify([...dataProducts, ...datasets])}
      `,
    })

    // Simple keyword matching for demo purposes
    // In a real implementation, you would use vector search or more sophisticated matching
    const allItems = [...dataProducts, ...datasets]
    const queryTerms = query.toLowerCase().split(/\s+/)

    const results = allItems
      .map((item) => {
        const keywordMatches = (item.keywords || []).filter((keyword) =>
          queryTerms.some((term) => keyword.toLowerCase().includes(term)),
        ).length

        const titleMatches = queryTerms.filter((term) => item.title.toLowerCase().includes(term)).length * 2 // Title matches are weighted more heavily

        const descriptionMatches = queryTerms.filter((term) => item.description.toLowerCase().includes(term)).length

        const score = keywordMatches + titleMatches + descriptionMatches

        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ item }) => item)

    return NextResponse.json({
      aiResponse: aiAnalysis,
      results,
    })
  } catch (error) {
    console.error("AI search error:", error)
    return NextResponse.json({ error: "Failed to process search" }, { status: 500 })
  }
}
