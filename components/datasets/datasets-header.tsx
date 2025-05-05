import Image from "next/image"

export function DatasetsHeader() {
  return (
    <div className="flex justify-between items-start border-b pb-6">
      <div>
        <h2 className="text-3xl font-bold text-[#9e1b32]">Datasets</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Explore, analyze, and share quality data across your organization. Browse our collection of
          <span className="font-medium">
            {" "}
            tabular, relational, analytics, visualization, document-based, and raw datasets
          </span>
          .{" "}
          <a href="#" className="text-[#9e1b32] hover:underline">
            Learn more
          </a>{" "}
          about data types, creating, and collaborating.
        </p>
      </div>

      <div className="w-64 h-32 relative">
        <Image
          src="/placeholder.svg?height=128&width=256&text=Data+Visualization"
          alt="Data visualization"
          width={256}
          height={128}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
