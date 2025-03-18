"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Table = {
  table_no: string
  seat_availabe: number
  seat_assigned: number
  position_x: number
  position_y: number
}

export function TableSelection({
  tables,
  onSelectTable,
  familySize,
  isLoading,
}: {
  tables: Table[]
  onSelectTable: (tableNo: string) => void
  familySize: number
  isLoading: boolean
}) {
  return (
    <div className="space-y-4">
      {tables.map((table) => (
        <Card key={table.table_no} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Table {table.table_no}</h4>
                <p className="text-sm text-gray-500">{table.seat_availabe} seats available</p>
              </div>

              <Button
                onClick={() => onSelectTable(table.table_no)}
                disabled={isLoading}
                variant={table.seat_availabe >= familySize ? "default" : "outline"}
              >
                {isLoading ? "Selecting..." : "Select"}
              </Button>
            </div>

            {table.seat_availabe < familySize && (
              <div className="bg-amber-50 p-3 border-t border-amber-100">
                <p className="text-amber-700 text-sm">
                  <strong>Note:</strong> This table has fewer seats than your family size. You may need to split your
                  group.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

