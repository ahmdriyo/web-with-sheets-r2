import { CarsAdminView } from "@/src/features/admin-showroom/cars/CarsAdminView";
import { Suspense } from "react";

const CarsPage = () => {
  return (
    <Suspense fallback={null}>
      <CarsAdminView />;
    </Suspense>
  );
};

export default CarsPage;
