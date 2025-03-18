"use client"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type Guest = {
  table_no: string
  name: string
  member_count: number
}

export function GuestList({ guests, eventId }: { guests: Guest[]; eventId: string }) {
  const router = useRouter()

  const handleSelectGuest = (guest: Guest) => {
    router.push(`/event/${eventId}/table/${guest.table_no}?name=${encodeURIComponent(guest.name)}`)
  }

  return (
    <div className="space-y-3">
      {guests.map((guest, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:bg-rose-50 transition-colors"
          onClick={() => handleSelectGuest(guest)}
        >
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">{guest.name}</h4>
              <p className="text-sm text-gray-500">Family of {guest.member_count}</p>
            </div>
            <div className="bg-rose-100 text-rose-800 font-semibold px-3 py-1 rounded-full">Table {guest.table_no}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

