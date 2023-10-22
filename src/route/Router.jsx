import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RedirectIfAuthenticate from "../features/auth/components/RedirectIfAuthenticate";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ProtectedAdminRoute from "../features/auth/components/ProtectedAdminRoute";

import LoginPage from "../pages/LoginPage";
import Container from "../layouts/Container";
import Dashboard from "../pages/Dashboard";
import AgentPage from "../pages/AgentPage";
import ProductPage from "../pages/ProductPage";
import ConfigPage from "../pages/ConfigPage";
import CreatePage from "../pages/CreatePage";
import AdminPage from "../pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticate>
        <LoginPage />
      </RedirectIfAuthenticate>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Container />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/agent", element: <AgentPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/config", element: <ConfigPage /> },
      { path: "/create", element: <CreatePage /> },
      {
        path: "/admin",
        element: (
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
