// src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import HomePage from './screens/Home/HomePage.jsx';
import Register from './screens/Register/Register.jsx';
import Login from './screens/Login/Login.jsx';
import NotFoundPage from './screens/NotFound/NotFoundPage.jsx';
import { store } from './config/redux/stores/store.js';
import { Provider } from 'react-redux';

// Route Configuration
const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Main layout for all pages
    children: [
      {
        path: '/', // Default route (HomePage)
        element: <HomePage />,
      },
      {
        path: '/login', // Login page
        element: <Login />,
      },
      {
        path: '/register', // Register page
        element: <Register />,
      },
      {
        path: '*', // Catch-all for undefined routes (NotFound)
        element: <NotFoundPage />,
      },
    ],
  },
]);

// Render the Router
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
