"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchGuests } from "@/lib/api"
import { GuestList } from "@/components/guest-list"
import { RegisterGuestButton } from "@/components/register-guest-button"

export function GuestSearch({ eventId }: { eventId: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [guests, setGuests] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [noResults, setNoResults] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setNoResults(false)

    try {
      const results = await searchGuests(eventId, searchQuery)
      setGuests(results)
      setNoResults(results.length === 0)
    } catch (error) {
      console.error("Error searching guests:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {guests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Select your name:</h3>
          <GuestList guests={guests} eventId={eventId} />
        </div>
      )}

      {noResults && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">No guests found with that name.</p>
          <RegisterGuestButton eventId={eventId} />
        </div>
      )}
    </div>
  )
}

