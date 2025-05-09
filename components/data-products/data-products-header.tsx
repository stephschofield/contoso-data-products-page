import Image from "next/image"

export function DataProductsHeader() {
  return (
    <div className="flex justify-between items-start border-b pb-6">
      <div>
        <h2 className="text-3xl font-bold text-[#00336f]">Financial Data Products</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Discover ready-to-use financial data products for analysis, reporting, and decision-making across your
          organization.{" "}
          <a href="#" className="text-[#00336f] hover:underline">
            Learn more
          </a>{" "}
          about our data products and how to leverage them for financial insights.
        </p>
      </div>

      <div className="w-64 h-32 relative">
        <Image
          src="/placeholder.svg?height=128&width=256&text=Financial+Insights"
          alt="Financial data products visualization"
          width={256}
          height={128}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
