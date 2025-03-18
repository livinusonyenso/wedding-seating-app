import { fetchEventDetails } from "@/lib/api"

export async function EventDetails({ eventId }: { eventId: string }) {
  const event = await fetchEventDetails(eventId)

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-rose-800 mb-2">
        {event.bride} & {event.groom}
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        {new Date(event.wedding_date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="w-24 h-1 bg-rose-300 mx-auto mb-6"></div>
    </div>
  )
}

