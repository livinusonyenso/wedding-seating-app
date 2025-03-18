"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAvailableTables, registerGuest } from "@/lib/api"
import { TableSelection } from "@/components/table-selection"
import { useRouter } from "next/navigation"

export function RegisterForm({ eventId }: { eventId: string }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    memberCount: 1,
    phoneNumber: "",
  })
  const [availableTables, setAvailableTables] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "memberCount" ? Number.parseInt(value) || 1 : value,
    })
  }

  const handleFindTables = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.phoneNumber) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      const tables = await getAvailableTables(eventId)
      setAvailableTables(tables)
      setStep(2)
    } catch (error) {
      console.error("Error fetching available tables:", error)
      setError("Failed to fetch available tables. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectTable = async (tableNo: string) => {
    setIsLoading(true)
    setError("")

    try {
      await registerGuest(eventId, {
        table_no: tableNo,
        name: formData.name,
        phone_number: formData.phoneNumber,
        member_count: formData.memberCount,
      })

      // Redirect to the table view
      router.push(`/event/${eventId}/table/${tableNo}?name=${encodeURIComponent(formData.name)}`)
    } catch (error) {
      console.error("Error registering guest:", error)
      setError("Failed to register. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleFindTables} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberCount">Number of Family Members (including yourself)</Label>
            <Input
              id="memberCount"
              name="memberCount"
              type="number"
              min="1"
              value={formData.memberCount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Finding Tables..." : "Find Available Tables"}
          </Button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Select a Table</h2>

          {availableTables.length > 0 ? (
            <TableSelection
              tables={availableTables}
              onSelectTable={handleSelectTable}
              familySize={formData.memberCount}
              isLoading={isLoading}
            />
          ) : (
            <p className="text-center py-4 text-gray-600">
              No tables available at the moment. Please check with the host.
            </p>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <Button variant="outline" className="mt-4 w-full" onClick={() => setStep(1)} disabled={isLoading}>
            Back to Form
          </Button>
        </div>
      )}
    </div>
  )
}

