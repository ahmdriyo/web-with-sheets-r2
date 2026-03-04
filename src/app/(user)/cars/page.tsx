import { CarsView } from "@/src/features/cars";
import { Suspense } from "react";

export default function CarsPage() {
  return (
    <Suspense fallback={null}>
      <CarsView />
    </Suspense>
  );
}
