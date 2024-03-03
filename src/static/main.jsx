import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { HeaderAndFooterLayout, loader as HeaderAndFooterLayoutLoader } from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout.jsx';
import { Main, loader as mainLoader } from '../pages/Main/Main.jsx';
import { CategoryPage, loader as categoryPageLoader } from '../pages/Category/Category.jsx';
import { ProductsPage, loader as productsLoader } from '../pages/Products/Products.jsx';

const router = createBrowserRouter([
  {
    loader: HeaderAndFooterLayoutLoader,
    element: <HeaderAndFooterLayout />,
    children: [
      {
        path: '/',
        loader: mainLoader,
        element: <Main />,
      },
      {
        path: ':categoryId',
        loader: categoryPageLoader,
        element: <CategoryPage />,
      },
      {
        path: ':categoryId/:subcategoryId',
        loader: productsLoader,
        element: <ProductsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
