import { createHashRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { worker } from '../utils/serverAPI.js';
import store from '../globalStore/globalStore.js';
import './main.scss';
import { HeaderAndFooterLayout } from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout.jsx';
import { ErrorPage } from '../pages/Error/Error.jsx';
import MainLazy from '../pages/Main/Main.lazy.jsx';
import CategoryPageLazy from '../pages/Category/Category.lazy.jsx';
import ProductsPageLazy from '../pages/Products/Products.lazy.jsx';
import ProductPageLazy from '../pages/Product/Product.lazy.jsx';
import WishlistPageLazy from '../pages/Wishlist/Wishlist.lazy.jsx';
import CartPageLazy from '../pages/Cart/Cart.lazy.jsx';
import ComparePageLazy from '../pages/Compare/Compare.lazy.jsx';
import DeliveryPageLazy from '../pages/Delivery/Delivery.lazy.jsx';
import PaymentPageLazy from '../pages/Payment/Payment.lazy.jsx';
import ContactsPageLazy from '../pages/Contacts/Contact.lazy.jsx';
import NewsPageLazy from '../pages/News/News.lazy.jsx';
import NewsArticlePageLazy from '../pages/NewsArticle/NewsArticle.lazy.jsx';
import SearchPageLazy from '../pages/Search/Search.lazy.jsx';
import { loader as getSearchPageLoader } from '../pages/Search/SearchUtils.jsx';
import { GetCategoriesAndSubcategoriesPage, loader as getCategoriesAndSubcategoriesLoader } from '../pages/GetCategoriesAndSubcategories/GetCategoriesAndSubcategories.jsx';
import { GetRandomProductPage, loader as getRandomProductLoader } from '../pages/GetRandomProduct/GetRandomProduct.jsx';

const router = createHashRouter([
  {
    element: <HeaderAndFooterLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <MainLazy />,
          },
          {
            path: ':categoryId',
            element: <CategoryPageLazy />,
          },
          {
            path: ':categoryId/:subcategoryId',
            element: <ProductsPageLazy />,
          },
          {
            path: ':categoryId/:subcategoryId/:productId',
            element: <ProductPageLazy />,
          },
          {
            path: 'wishlist',
            element: <WishlistPageLazy />,
          },
          {
            path: 'cart',
            element: <CartPageLazy />,
          },
          {
            path: 'compare',
            element: <ComparePageLazy />,
          },
          {
            path: 'delivery',
            element: <DeliveryPageLazy />,
          },
          {
            path: 'payment',
            element: <PaymentPageLazy />,
          },
          {
            path: 'contacts',
            element: <ContactsPageLazy />,
          },
          {
            path: 'news',
            element: <NewsPageLazy />,
          },
          {
            path: 'news/:articleId',
            element: <NewsArticlePageLazy />,
          },
          {
            path: 'search',
            loader: getSearchPageLoader,
            element: <SearchPageLazy />,
          },
          {
            path: 'getCategoriesAndSubcategories',
            loader: getCategoriesAndSubcategoriesLoader,
            element: <GetCategoriesAndSubcategoriesPage />,
          },
          {
            path: 'getRandomProduct',
            loader: getRandomProductLoader,
            element: <GetRandomProductPage />,
          },
        ],
      },
    ],
  },
]);

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' });

  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );
}

start();
