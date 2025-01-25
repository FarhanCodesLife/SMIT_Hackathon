import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./screens/Home/HomePage.jsx";

import { store } from "./config/redux/stores/store.js";
import { Provider } from "react-redux";
import Register from "./screens/Register/Register.jsx";
import Login from "./screens/Login/Login.jsx";

// Route Configuration
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout for all pages
    children: [
      {
        path: "", // Default route (HomePage)
        element: <HomePage />,
      },
      {
        path: "/login", // Default route (HomePage)
        element: <Login />,
      },
      {
        path: "/register", // Default route (HomePage)
        element: <Register />,
      },

   
    ],
  },
]);

// Render the Router
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
