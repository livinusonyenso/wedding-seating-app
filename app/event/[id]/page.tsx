import { Suspense } from "react";
import { EventDetails } from "@/components/event-details";
import { GuestSearch } from "@/components/guest-search";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function EventPage({ params }: { params: { id: string } }) {
  // Ensure params.id is available before using it
  if (!params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">Invalid Event ID</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Suspense fallback={<LoadingSpinner />}>
          <EventDetails eventId={params?.id} />
        </Suspense>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Find Your Seat</h2>
          <GuestSearch eventId={params?.id} />
        </div>
      </div>
    </div>
  );
}

// Ensure params is pre-generated to avoid hydration errors
export async function generateStaticParams() {
  return []; // If using static generation, return a list of possible event IDs
}
