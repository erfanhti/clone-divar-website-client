import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import NotFound404 from "../pages/NotFound404";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import { Oval } from "react-loader-spinner";
import { Grid2 } from "@mui/material";

function Router() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  if (isPending)
    return (
      <Grid2 container justifyContent="center" alignItems="center">
        <Oval
          visible={true}
          height="60"
          width="60"
          strokeWidth="6"
          color="#a62626"
          secondaryColor="#AFAAAA"
        />
      </Grid2>
    );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />
        }
      />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default Router;
