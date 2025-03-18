import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";

export default function RegisterPage({ params }: { params: { id: string } }) {
  if (!params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">Invalid Event ID</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-rose-800 mb-6">
          Register as a Guest
        </h1>
        <RegisterForm eventId={params?.id} />
      </div>

      <div className="text-center mt-4">
        <Link href={`/event/${params?.id}`}>
          <Button variant="outline" className="bg-white hover:bg-rose-50">
            Back to Search
          </Button>
        </Link>
      </div>
    </div>
  );
}
