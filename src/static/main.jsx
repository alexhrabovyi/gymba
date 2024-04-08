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
import ProductPageLazy from '../pages/Product/Product.lazy.jsx';
import { loader as productPageLoader } from '../pages/Product/ProductUtils.jsx';
import WishlistPageLazy from '../pages/Wishlist/Wishlist.lazy.jsx';
import { loader as wishlistLoader, action as wishlistAction } from '../pages/Wishlist/WishlistUtils.jsx';
import CartPageLazy from '../pages/Cart/Cart.lazy.jsx';
import { loader as cartLoader, action as cartAction } from '../pages/Cart/CartUtils.jsx';
import ComparePageLazy from '../pages/Compare/Compare.lazy.jsx';
import { loader as compareLoader, action as compareAction } from '../pages/Compare/CompareUtils.jsx';
import DeliveryPageLazy from '../pages/Delivery/Delivery.lazy.jsx';
import PaymentPageLazy from '../pages/Payment/Payment.lazy.jsx';
import ContactsPageLazy from '../pages/Contacts/Contact.lazy.jsx';
import NewsPageLazy from '../pages/News/News.lazy.jsx';
import { loader as newsPageLoader } from '../pages/News/NewsUtils.jsx';
import NewsArticlePageLazy from '../pages/NewsArticle/NewsArticle.lazy.jsx';
import { loader as newsArticleLoader } from '../pages/NewsArticle/NewsArticleUtils.jsx';
import SearchPageLazy from '../pages/Search/Search.lazy.jsx';
import { loader as getSearchPageLoader } from '../pages/Search/SearchUtils.jsx';
import { GetCategoriesAndSubcategoriesPage, loader as getCategoriesAndSubcategoriesLoader } from '../pages/GetCategoriesAndSubcategories/GetCategoriesAndSubcategories.jsx';
import { loader as getBreadCrumbsInfoLoader, action as getBreadCrumbsInfoAction } from '../pages/GetBreadCrumbsInfo/GetBreadCrumbsInfo.jsx';
import { loader as getSubcategoryProductsLoader } from '../pages/GetSubcategoryProducts/GetSubcategoryProducts.jsx';
import { loader as getAnalogueProductsLoader, action as getAnalogueProductsAction } from '../pages/GetAnalogueProducts/GetAnalogueProducts.jsx';
import { GetCompareProductsPage, loader as getCompareProductsLoader } from '../pages/GetCompareProducts/GetCompareProducts.jsx';
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
            element: <ProductPageLazy />,
          },
          {
            path: 'wishlist',
            loader: wishlistLoader,
            action: wishlistAction,
            element: <WishlistPageLazy />,
          },
          {
            path: 'cart',
            loader: cartLoader,
            action: cartAction,
            element: <CartPageLazy />,
          },
          {
            path: 'compare',
            loader: compareLoader,
            action: compareAction,
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
            loader: newsPageLoader,
            element: <NewsPageLazy />,
          },
          {
            path: 'news/:articleId',
            loader: newsArticleLoader,
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
            element: <GetCompareProductsPage />,
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
