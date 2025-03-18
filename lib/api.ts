// Mock API functions that would be replaced with actual API calls

// Types
export type Event = {
  bride: string
  groom: string
  wedding_date: string
  hall_layout_image: string
  tables: Table[]
}

export type Table = {
  table_no: string
  seat_availabe: number
  seat_assigned: number
  position_x: number
  position_y: number
}

export type Guest = {
  table_no: string
  name: string
  member_count: number
  phone_number?: string
}

// Mock data
const mockEvent: Event = {
  bride: "Sarah",
  groom: "Michael",
  wedding_date: "2025-06-15",
  hall_layout_image: "/placeholder.svg?height=400&width=800",
  tables: [
    { table_no: "1", seat_availabe: 4, seat_assigned: 6, position_x: 0.2, position_y: 0.3 },
    { table_no: "2", seat_availabe: 2, seat_assigned: 8, position_x: 0.5, position_y: 0.3 },
    { table_no: "3", seat_availabe: 6, seat_assigned: 4, position_x: 0.8, position_y: 0.3 },
    { table_no: "4", seat_availabe: 0, seat_assigned: 10, position_x: 0.2, position_y: 0.7 },
    { table_no: "5", seat_availabe: 3, seat_assigned: 7, position_x: 0.5, position_y: 0.7 },
    { table_no: "6", seat_availabe: 5, seat_assigned: 5, position_x: 0.8, position_y: 0.7 },
  ],
}

const mockGuests: Guest[] = [
  { table_no: "1", name: "John Smith", member_count: 2 },
  { table_no: "2", name: "Emily Johnson", member_count: 4 },
  { table_no: "3", name: "Robert Williams", member_count: 3 },
  { table_no: "5", name: "Jessica Brown", member_count: 2 },
]

// API functions
export async function fetchEventDetails(eventId: string): Promise<Event> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEvent
}

export async function searchGuests(eventId: string, query: string): Promise<Guest[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Only return exact word matches as per requirements
  return mockGuests.filter((guest) =>
    guest.name
      .toLowerCase()
      .split(" ")
      .some((word) => word.toLowerCase() === query.toLowerCase()),
  )
}

export async function getAvailableTables(eventId: string): Promise<Table[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return tables with available seats
  return mockEvent.tables.filter((table) => table.seat_availabe > 0)
}

export async function registerGuest(
  eventId: string,
  guestData: {
    table_no: string
    name: string
    phone_number: string
    member_count: number
  },
): Promise<Table[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, this would update the server
  // For now, we'll just return the tables with updated counts
  return mockEvent.tables.map((table) => {
    if (table.table_no === guestData.table_no) {
      return {
        ...table,
        seat_availabe: Math.max(0, table.seat_availabe - guestData.member_count),
        seat_assigned: table.seat_assigned + guestData.member_count,
      }
    }
    return table
  })
}

