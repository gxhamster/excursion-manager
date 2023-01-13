import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PendingExcursionsPage from "./components/PendingExcursionsPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/pending",
//     element: <PendingExcursionsPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <RouterProvider router={router}></RouterProvider> */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
