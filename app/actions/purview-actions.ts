"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import {
  fetchDataMap,
  fetchGlossaryTerms,
  getEntityDetails,
  type DataMapResponse,
  type GlossaryResponse,
  type PurviewEntity,
} from "@/lib/purview-api"

// Get the Purview account name from environment variables
const PURVIEW_ACCOUNT_NAME = process.env.PURVIEW_ACCOUNT_NAME || ""

/**
 * Server action to fetch data map entities
 */
export async function getDataMapEntities(query = "", limit = 20, entityType?: string): Promise<DataMapResponse> {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Authentication required")
  }

  try {
    return await fetchDataMap(PURVIEW_ACCOUNT_NAME, query, limit, entityType)
  } catch (error) {
    console.error("Error in getDataMapEntities:", error)
    return { entities: [], totalCount: 0 }
  }
}

/**
 * Server action to fetch glossary terms
 */
export async function getGlossaryTerms(query = "", limit = 20): Promise<GlossaryResponse> {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Authentication required")
  }

  try {
    return await fetchGlossaryTerms(PURVIEW_ACCOUNT_NAME, query, limit)
  } catch (error) {
    console.error("Error in getGlossaryTerms:", error)
    return { terms: [], totalCount: 0 }
  }
}

/**
 * Server action to get entity details
 */
export async function getEntityDetail(entityGuid: string): Promise<PurviewEntity | null> {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Authentication required")
  }

  try {
    return await getEntityDetails(PURVIEW_ACCOUNT_NAME, entityGuid)
  } catch (error) {
    console.error("Error in getEntityDetail:", error)
    return null
  }
}
