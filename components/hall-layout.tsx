import { fetchEventDetails } from "@/lib/api"
import Image from "next/image"

export async function HallLayout({
  eventId,
  highlightedTable,
}: {
  eventId: string
  highlightedTable?: string
}) {
  const event = await fetchEventDetails(eventId)

  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {event.hall_layout_image ? (
        <Image src={event.hall_layout_image || "/placeholder.svg"} alt="Hall Layout" fill className="object-contain" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Hall layout image not available</p>
        </div>
      )}

      {event.tables.map((table) => (
        <div
          key={table.table_no}
          className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
            highlightedTable === table.table_no ? "animate-pulse" : ""
          }`}
          style={{
            left: `${table.position_x * 100}%`,
            top: `${table.position_y * 100}%`,
          }}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              highlightedTable === table.table_no ? "bg-rose-600 ring-4 ring-rose-300" : "bg-gray-400"
            }`}
          >
            {table.table_no}
          </div>
        </div>
      ))}
    </div>
  )
}

