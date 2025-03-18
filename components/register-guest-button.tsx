"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function RegisterGuestButton({ eventId }: { eventId: string }) {
  const router = useRouter()

  const handleRegister = () => {
    router.push(`/event/${eventId}/register`)
  }

  return (
    <Button onClick={handleRegister} variant="outline" className="bg-white hover:bg-rose-50">
      Register as a New Guest
    </Button>
  )
}

