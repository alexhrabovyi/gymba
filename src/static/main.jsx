import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderAndFooterLayout />,
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
