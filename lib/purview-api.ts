import { getSession } from "next-auth/react"

// Purview API base URL and version
const API_VERSION = "2023-10-01"

// Types for Purview API responses
export interface PurviewEntity {
  id: string
  name: string
  qualifiedName: string
  description?: string
  entityType: string
  classifications?: string[]
  status?: string
  createdBy?: string
  updatedBy?: string
  createTime?: string
  updateTime?: string
}

export interface GlossaryTerm {
  guid: string
  name: string
  qualifiedName: string
  status: string
  longDescription?: string
  abbreviation?: string
  examples?: string[]
  createdBy?: string
  updatedBy?: string
  createTime?: string
  updateTime?: string
}

export interface DataMapResponse {
  entities: PurviewEntity[]
  totalCount: number
  nextCursor?: string
}

export interface GlossaryResponse {
  terms: GlossaryTerm[]
  totalCount: number
  nextCursor?: string
}

/**
 * Fetches data from the Purview Data Map API
 * @param purviewAccountName The name of your Purview account
 * @param query Optional search query
 * @param limit Maximum number of results to return
 * @param entityType Optional filter by entity type
 */
export async function fetchDataMap(
  purviewAccountName: string,
  query = "",
  limit = 20,
  entityType?: string,
): Promise<DataMapResponse> {
  const session = await getSession()
  if (!session) {
    throw new Error("Authentication required")
  }

  const baseUrl = `https://${purviewAccountName}.purview.azure.com/catalog/api`

  // Build the search query
  const searchQuery: any = {
    limit,
    offset: 0,
  }

  if (query) {
    searchQuery.keywords = query
  }

  if (entityType) {
    searchQuery.filter = {
      entityType,
    }
  }

  try {
    const response = await fetch(`${baseUrl}/search/query?api-version=${API_VERSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(searchQuery),
    })

    if (!response.ok) {
      throw new Error(`Purview API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Transform the response to our interface format
    return {
      entities: data.value || [],
      totalCount: data["@search.count"] || 0,
      nextCursor: data["@search.nextPageToken"],
    }
  } catch (error) {
    console.error("Error fetching data map:", error)
    throw error
  }
}

/**
 * Fetches glossary terms from the Purview Glossary API
 * @param purviewAccountName The name of your Purview account
 * @param query Optional search query
 * @param limit Maximum number of results to return
 */
export async function fetchGlossaryTerms(
  purviewAccountName: string,
  query = "",
  limit = 20,
): Promise<GlossaryResponse> {
  const session = await getSession()
  if (!session) {
    throw new Error("Authentication required")
  }

  const baseUrl = `https://${purviewAccountName}.purview.azure.com/catalog/api`

  // Build the glossary query
  const glossaryQuery: any = {
    limit,
    offset: 0,
  }

  if (query) {
    glossaryQuery.name = query
  }

  try {
    const response = await fetch(`${baseUrl}/glossary/terms?api-version=${API_VERSION}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Purview API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Transform the response to our interface format
    return {
      terms: data.value || [],
      totalCount: data["@odata.count"] || 0,
      nextCursor: data["@odata.nextLink"],
    }
  } catch (error) {
    console.error("Error fetching glossary terms:", error)
    throw error
  }
}

/**
 * Gets detailed information about a specific entity
 * @param purviewAccountName The name of your Purview account
 * @param entityGuid The GUID of the entity to retrieve
 */
export async function getEntityDetails(purviewAccountName: string, entityGuid: string): Promise<PurviewEntity> {
  const session = await getSession()
  if (!session) {
    throw new Error("Authentication required")
  }

  const baseUrl = `https://${purviewAccountName}.purview.azure.com/catalog/api`

  try {
    const response = await fetch(`${baseUrl}/atlas/v2/entity/guid/${entityGuid}?api-version=${API_VERSION}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Purview API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching entity details:", error)
    throw error
  }
}
