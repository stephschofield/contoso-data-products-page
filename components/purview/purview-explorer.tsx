"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataMapView } from "./data-map-view"
import { GlossaryView } from "./glossary-view"

export function PurviewExplorer() {
  return (
    <Tabs defaultValue="datamap" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="datamap">Data Map</TabsTrigger>
        <TabsTrigger value="glossary">Data Glossary</TabsTrigger>
      </TabsList>
      <TabsContent value="datamap">
        <DataMapView />
      </TabsContent>
      <TabsContent value="glossary">
        <GlossaryView />
      </TabsContent>
    </Tabs>
  )
}
