// ** React
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// ** Routes
import { public_routes } from "./index";

// ** Component
import CircleLoader from "@nub/components/CirculeLoader";

export default function AppRoutes() {
  return (
    <div style={{ minHeight: "100vh", position: "relative",marginTop:"120px" }}>
      <Suspense fallback={<CircleLoader />}>
        <Routes>
          {public_routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}
