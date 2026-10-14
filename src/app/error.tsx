"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-foreground/60 max-w-sm text-sm">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
