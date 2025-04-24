import Image from "next/image"

export function DataProductsHeader() {
  return (
    <div className="flex justify-between items-start border-b pb-6">
      <div>
        <h2 className="text-3xl font-bold text-[#9e1b32]">Data Products</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Discover ready-to-use data products for insights and analysis across your organization.{" "}
          <a href="#" className="text-[#9e1b32] hover:underline">
            Learn more
          </a>{" "}
          about data products and how to use them.
        </p>
      </div>

      <div className="w-64 h-32 relative">
        <Image
          src="/placeholder.svg?height=128&width=256&text=Data+Products"
          alt="Data products visualization"
          width={256}
          height={128}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
