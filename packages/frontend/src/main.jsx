import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import LearnEnglish from "./routes/LearnEnglish";
import Dashboard from "./routes/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <LearnEnglish />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
