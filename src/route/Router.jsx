import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Container />,
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
