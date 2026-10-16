import type { Metadata } from "next";
import { Suspense } from "react";
import SubmitPriceClient from "../submitPrice/SubmitPriceClient";

export const metadata: Metadata = {
  title: "Oracle",
  description: "View Karma Oracle details and submit price observations.",
};

export default function OraclePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          }
        >
          <SubmitPriceClient />
        </Suspense>
      </main>
    </div>
  );
}
