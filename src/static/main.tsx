import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { worker } from '../utils/serverAPI';
import store from '../globalStore/globalStore';
import './main.scss';
import { HeaderAndFooterLayout } from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';
import { ErrorPage } from '../pages/Error/Error';
import MainLazy from '../pages/Main/Main.lazy';
import CategoryPageLazy from '../pages/Category/Category.lazy';
import ProductsPageLazy from '../pages/Products/Products.lazy';
import ProductPageLazy from '../pages/Product/Product.lazy';
import WishlistPageLazy from '../pages/Wishlist/Wishlist.lazy';
import CartPageLazy from '../pages/Cart/Cart.lazy';
import ComparePageLazy from '../pages/Compare/Compare.lazy';
import DeliveryPageLazy from '../pages/Delivery/Delivery.lazy';
import PaymentPageLazy from '../pages/Payment/Payment.lazy';
import ContactsPageLazy from '../pages/Contacts/Contact.lazy';
import NewsPageLazy from '../pages/News/News.lazy';
import NewsArticlePageLazy from '../pages/NewsArticle/NewsArticle.lazy';
import SearchPageLazy from '../pages/Search/Search.lazy';

const router = createBrowserRouter([
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
            element: <SearchPageLazy />,
          },
        ],
      },
    ],
  },
]);

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' });

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );
}

start();
