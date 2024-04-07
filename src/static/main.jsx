import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { HeaderAndFooterLayout } from '../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout.jsx';
import { ErrorPage } from '../pages/Error/Error.jsx';
import MainLazy from '../pages/Main/Main.lazy.jsx';
import { loader as mainLoader } from '../pages/Main/MainUtils.jsx';
import CategoryPageLazy from '../pages/Category/Category.lazy.jsx';
import { loader as categoryLoader } from '../pages/Category/CategoryUtils.jsx';
import ProductsPageLazy from '../pages/Products/Products.lazy.jsx';
import { ProductPage, loader as productPageLoader } from '../pages/Product/Product.jsx';
import { WishlistPage, loader as wishlistLoader, action as wishlistAction } from '../pages/Wishlist/Wishlist.jsx';
import { CartPage, loader as cartLoader, action as cartAction } from '../pages/Cart/Cart.jsx';
import { ComparePage, loader as compareLoader, action as compareAction } from '../pages/Compare/Compare.jsx';
import DeliveryPageLazy from '../pages/Delivery/Delivery.lazy.jsx';
import { PaymentPage } from '../pages/Payment/Payment.jsx';
import { ContactsPage } from '../pages/Contacts/Contacts.jsx';
import { NewsPage, loader as newsPageLoader } from '../pages/News/News.jsx';
import { NewsArticlePage, loader as newsArticleLoader } from '../pages/NewsArticle/NewsArticle.jsx';
import { SearchPage, loader as getSearchPageLoader } from '../pages/Search/Search.jsx';
import { GetCategoriesAndSubcategoriesPage, loader as getCategoriesAndSubcategoriesLoader } from '../pages/GetCategoriesAndSubcategories/GetCategoriesAndSubcategories.jsx';
import { loader as getBreadCrumbsInfoLoader, action as getBreadCrumbsInfoAction } from '../pages/GetBreadCrumbsInfo/GetBreadCrumbsInfo.jsx';
import { loader as getSubcategoryProductsLoader } from '../pages/GetSubcategoryProducts/GetSubcategoryProducts.jsx';
import { loader as getAnalogueProductsLoader, action as getAnalogueProductsAction } from '../pages/GetAnalogueProducts/GetAnalogueProducts.jsx';
import { loader as getCompareProductsLoader } from '../pages/GetCompareProducts/GetCompareProducts.jsx';
import { GetRandomProductPage, loader as getRandomProductLoader } from '../pages/GetRandomProduct/GetRandomProduct.jsx';

const router = createBrowserRouter([
  {
    element: <HeaderAndFooterLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            loader: mainLoader,
            element: <MainLazy />,
          },
          {
            path: ':categoryId',
            loader: categoryLoader,
            element: <CategoryPageLazy />,
          },
          {
            path: ':categoryId/:subcategoryId',
            element: <ProductsPageLazy />,
          },
          {
            path: ':categoryId/:subcategoryId/:productId',
            loader: productPageLoader,
            element: <ProductPage />,
          },
          {
            path: 'wishlist',
            loader: wishlistLoader,
            action: wishlistAction,
            element: <WishlistPage />,
          },
          {
            path: 'cart',
            loader: cartLoader,
            action: cartAction,
            element: <CartPage />,
          },
          {
            path: 'compare',
            loader: compareLoader,
            action: compareAction,
            element: <ComparePage />,
          },
          {
            path: 'delivery',
            element: <DeliveryPageLazy />,
          },
          {
            path: 'payment',
            element: <PaymentPage />,
          },
          {
            path: 'contacts',
            element: <ContactsPage />,
          },
          {
            path: 'news',
            loader: newsPageLoader,
            element: <NewsPage />,
          },
          {
            path: 'news/:articleId',
            loader: newsArticleLoader,
            element: <NewsArticlePage />,
          },
          {
            path: 'search',
            loader: getSearchPageLoader,
            element: <SearchPage />,
          },
          {
            path: 'getCategoriesAndSubcategories',
            loader: getCategoriesAndSubcategoriesLoader,
            element: <GetCategoriesAndSubcategoriesPage />,
          },
          {
            path: 'getBreadCrumbsInfo',
            loader: getBreadCrumbsInfoLoader,
            action: getBreadCrumbsInfoAction,
          },
          {
            path: 'getSubcategoryProducts/:categoryId/:subcategoryId',
            loader: getSubcategoryProductsLoader,
          },
          {
            path: 'getAnalogueProducts',
            action: getAnalogueProductsAction,
            loader: getAnalogueProductsLoader,
          },
          {
            path: 'getCompareProducts',
            loader: getCompareProductsLoader,
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

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
