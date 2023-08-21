import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RedirectIfAuthenticate from '../features/auth/RedirectIfAuthenticate';
import ProtectedRoute from '../features/auth/ProtectedRoute';
import LoginPage from "../pages/LoginPage";
import Container from "../layouts/Container";
import HomePage from "../pages/HomePage";
import AgentPage from "../pages/AgentPage";
import ConfigPage from "../pages/ConfigPage";
import ReportPage from "../pages/ReportPage";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticate>
        <LoginPage />
      </RedirectIfAuthenticate>
    )
  },
  {
    element: (
      <ProtectedRoute>
        <Container />
      </ProtectedRoute>
    )
    ,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/agent", element: <AgentPage /> },
      { path: "/config", element: <ConfigPage /> },
      { path: "/report", element: <ReportPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
