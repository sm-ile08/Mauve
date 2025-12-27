import { Suspense } from "react";
import TrackClient from "./TrackClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TrackClient />
    </Suspense>
  );
}
