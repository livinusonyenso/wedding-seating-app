"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/event/123"); // Client-side navigation
  }, []);

  return <p>Redirecting...</p>;
}
