import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Mock database of financial data products and datasets
const dataProducts = [
  {
    id: 1,
    title: "Customer 360° Dashboard",
    type: "product",
    description: "Comprehensive view of customer financial behavior, product usage, and engagement metrics",
    image: "/placeholder.svg?height=300&width=300&text=Customer+360",
    link: "/discover/product/1",
    tags: ["customer", "analytics", "dashboard"],
    keywords: ["customer", "behavior", "engagement", "360", "profile", "segmentation"],
  },
  {
    id: 2,
    title: "Credit Risk Assessment Model",
    type: "product",
    description: "Advanced risk scoring model for loan applications and portfolio management",
    image: "/placeholder.svg?height=300&width=300&text=Credit+Risk",
    link: "/discover/product/2",
    tags: ["risk", "credit", "model"],
    keywords: ["risk", "credit", "loan", "scoring", "default", "assessment"],
  },
  {
    id: 3,
    title: "Regulatory Compliance Monitor",
    type: "product",
    description: "Real-time monitoring of transactions and activities for regulatory compliance",
    image: "/placeholder.svg?height=300&width=300&text=Compliance",
    link: "/discover/product/3",
    tags: ["compliance", "monitoring", "regulatory"],
    keywords: ["compliance", "regulatory", "monitoring", "KYC", "AML", "fraud"],
  },
  {
    id: 4,
    title: "Investment Portfolio Analytics",
    type: "product",
    description: "Performance analysis, risk assessment, and forecasting for investment portfolios",
    image: "/placeholder.svg?height=300&width=300&text=Portfolio+Analytics",
    link: "/discover/product/4",
    tags: ["investments", "analytics", "portfolio"],
    keywords: ["investment", "portfolio", "performance", "asset", "allocation", "returns"],
  },
  {
    id: 5,
    title: "Fraud Detection System",
    type: "product",
    description: "AI-powered system for detecting and preventing fraudulent transactions",
    image: "/placeholder.svg?height=300&width=300&text=Fraud+Detection",
    link: "/discover/product/5",
    tags: ["security", "fraud", "AI"],
    keywords: ["fraud", "detection", "security", "anomaly", "transaction", "alert"],
  },
  {
    id: 6,
    title: "Branch Performance Dashboard",
    type: "product",
    description: "Comprehensive analytics on branch operations, performance, and customer traffic",
    image: "/placeholder.svg?height=300&width=300&text=Branch+Analytics",
    link: "/discover/product/6",
    tags: ["operations", "branch", "performance"],
    keywords: ["branch", "performance", "operations", "traffic", "efficiency", "metrics"],
  },
]

const datasets = [
  {
    id: 101,
    title: "Transaction History Dataset",
    type: "dataset",
    description: "Anonymized customer transaction data for the past 5 years",
    tags: ["transactions", "raw data", "historical"],
    keywords: ["transactions", "history", "payments", "transfers", "deposits", "withdrawals"],
  },
  {
    id: 102,
    title: "Customer Demographics Dataset",
    type: "dataset",
    description: "Anonymized customer demographic information with financial behaviors",
    tags: ["demographics", "customers", "raw data"],
    keywords: ["demographics", "customers", "age", "income", "location", "segmentation"],
  },
  {
    id: 103,
    title: "Market Data Feed",
    type: "dataset",
    description: "Historical and real-time market data for financial instruments",
    tags: ["market", "real-time", "financial"],
    keywords: ["market", "stocks", "bonds", "rates", "prices", "indices"],
  },
  {
    id: 104,
    title: "Loan Performance Dataset",
    type: "dataset",
    description: "Historical loan performance data including defaults and prepayments",
    tags: ["loans", "performance", "risk"],
    keywords: ["loans", "performance", "default", "prepayment", "credit", "risk"],
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
        You are an AI assistant for a financial institution's internal data platform. 
        The user has searched for: "${query}"
        
        Based on this search query, provide a brief, helpful response about what financial data products or datasets might be relevant.
        Keep your response under 150 words and focus on being helpful for banking professionals.
        
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
