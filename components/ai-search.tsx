"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Loader2, MessageSquare, Database, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface SearchResult {
  id: number
  title: string
  type: "product" | "dataset" | "answer"
  description: string
  image?: string
  link?: string
  tags?: string[]
}

export function AISearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [aiResponse, setAIResponse] = useState("")
  const [error, setError] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setResults([])
    setAIResponse("")
    setError("")

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Search request failed")
      }

      const data = await response.json()
      setAIResponse(data.aiResponse)
      setResults(data.results)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to perform search. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setAIResponse("")
    setError("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative max-w-md cursor-pointer" onClick={() => setIsOpen(true)}>
        <Input
          type="search"
          placeholder="Search with AI..."
          className="pl-10 pr-4 py-2 border rounded-full w-full cursor-pointer"
          readOnly={!isOpen}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={() => setIsOpen(true)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {isOpen && query && (
          <button
            className="absolute right-3 top-2.5"
            onClick={(e) => {
              e.stopPropagation()
              clearSearch()
            }}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full mt-2 left-0 right-0 z-50 max-h-[80vh] overflow-auto shadow-lg border-gray-200 p-4">
          {!isSearching && !results.length && !query && (
            <div className="py-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium mb-1">AI-Powered Search</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Ask questions in natural language to find data products, analyze trends, or get insights about your
                data.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setQuery("Show me enrollment trends")}
                  >
                    Show me enrollment trends
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setQuery("Which courses have the highest demand?")}
                  >
                    Which courses have the highest demand?
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setQuery("Find data about student demographics")}
                  >
                    Find data about student demographics
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="py-12 text-center">
              <Loader2 className="h-8 w-8 mx-auto text-gray-400 animate-spin mb-4" />
              <p className="text-gray-500">Searching with AI...</p>
            </div>
          )}

          {error && (
            <div className="py-8 text-center">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => setError("")}>
                Try Again
              </Button>
            </div>
          )}

          {!isSearching && !error && results.length > 0 && (
            <div className="space-y-6">
              {aiResponse && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700">{aiResponse}</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Refine results
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Ask follow-up
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Search Results</h3>
                <div className="space-y-4">
                  {results.map((result) => (
                    <Link
                      href={result.link || "#"}
                      key={`${result.type}-${result.id}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {result.image ? (
                        <div className="flex-shrink-0 relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={result.image || "/placeholder.svg"}
                            alt={result.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                          {result.type === "dataset" ? (
                            <Database className="h-6 w-6 text-gray-400" />
                          ) : (
                            <BarChart2 className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.type === "product" ? "Data Product" : "Dataset"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                        {result.tags && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {result.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
