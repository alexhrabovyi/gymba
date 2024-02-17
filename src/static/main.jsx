/* eslint-disable import/no-duplicates */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout.jsx';
import Main from '../pages/Main/Main.jsx';
import { loader as mainLoader } from '../pages/Main/Main.jsx';

const router = createBrowserRouter([
  {
    element: <HeaderAndFooterLayout />,
    children: [
      {
        path: '/',
        loader: mainLoader,
        element: <Main />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
