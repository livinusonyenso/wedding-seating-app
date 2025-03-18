import { Suspense } from "react"
import { HallLayout } from "@/components/hall-layout"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TablePage({
  params,
  searchParams,
}: {
  params: { id: string; tableNo: string }
  searchParams: { name?: string }
}) {
  const { id, tableNo } = params
  const { name } = searchParams

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-rose-800 mb-4">Welcome, {name || "Guest"}!</h1>
          <p className="text-center text-lg mb-6">
            You are seated at <span className="font-semibold">Table {tableNo}</span>
          </p>

          <Suspense fallback={<LoadingSpinner />}>
            <HallLayout eventId={id} highlightedTable={tableNo} />
          </Suspense>
        </div>

        <div className="text-center">
          <Link href={`/event/${id}`}>
            <Button variant="outline" className="bg-white hover:bg-rose-50">
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

