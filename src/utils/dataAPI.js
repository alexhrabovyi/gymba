/* eslint-disable no-return-assign */
import products from './products.json';
import news from './news.json';

// utils

// async function fakeNetwork() {
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, 1500);
  });
}

function getCategoryAndSubcategory(categoryId, subcategoryId) {
  const category = products.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategory,
  };
}

function getProductCard(categoryId, subcategoryId, productId) {
  const category = products.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const product = subcategory.products.entities[productId];

  if (!product) throw new Response(null, { status: 404, statusText: 'Not found' });

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategoryName: subcategory.name,
    subcategoryId: subcategory.id,
    product: {
      name: product.name,
      id: product.id,
      price: product.price,
      oldPrice: product.oldPrice,
    },
  };
}

function getProductFullObj(categoryId, subcategoryId, productId) {
  const category = products.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const product = subcategory.products.entities[productId];

  if (!product) throw new Response(null, { status: 404, statusText: 'Not found' });

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategoryName: subcategory.name,
    subcategoryId: subcategory.id,
    product,
  };
}

function getLocalStorageIds(localStorageKey) {
  const ids = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  return ids;
}

async function addIdToStorage(localStorageKey, entitityToAdd, findFunc) {
  await fakeNetwork();

  let ids = localStorage.getItem(localStorageKey);

  if (ids === null) {
    ids = [];
    ids.push(entitityToAdd);
    localStorage.setItem(localStorageKey, JSON.stringify(ids));
  } else {
    ids = JSON.parse(ids);

    const isAlreadyExist = ids.find(findFunc);

    if (!isAlreadyExist) {
      ids.push(entitityToAdd);
      localStorage.setItem(localStorageKey, JSON.stringify(ids));
    }
  }

  return new Response(null, { status: 200, statusText: 'OK' });
}

async function deleteIdFromStorage(localStorageKey, findFunc) {
  await fakeNetwork();

  const ids = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const index = ids.findIndex(findFunc);

  if (index !== -1) ids.splice(index, 1);

  localStorage.setItem(localStorageKey, JSON.stringify(ids));

  return new Response(null, { status: 200, statusText: 'OK' });
}

function deleteAllFromStorage(localStorageKey) {
  localStorage.removeItem(localStorageKey);

  return new Response(null, { status: 200, statusText: 'OK' });
}

function getAllProductsFromStorage(localStorageKey) {
  const ids = getLocalStorageIds(localStorageKey);

  const productsForIds = ids.map(([cId, subcId, pId]) => (
    getProductCard(cId, subcId, pId)));

  return productsForIds;
}

// =====

export async function getCategoriesAndSubcategories() {
  await fakeNetwork();

  const categoriesFullObjs = Object.values(products.categories.entities);

  const categoriesShortObjs = categoriesFullObjs.map((c) => {
    const subcategoriesIds = c.subcategories.ids;

    const subcategoriesFullObjs = Object.values(c.subcategories.entities);
    const subcategoriesShortObjs = subcategoriesFullObjs.map((subC) => ({
      name: subC.name,
      id: subC.id,
      imgAlt: subC.imgAlt,
    }));

    const subcategoryEntities = {};

    subcategoriesShortObjs.forEach((s) => {
      subcategoryEntities[s.id] = s;
    });

    return {
      ...c,
      subcategories: {
        ids: subcategoriesIds,
        entities: subcategoryEntities,
      },
    };
  });

  return categoriesShortObjs;
}

function getSubcategoryFilters(subcategoryProducts) {
  const filters = {};

  subcategoryProducts.forEach((p) => {
    const specsFilters = p['specs-filters'];

    Object.entries(specsFilters).forEach(([name, value]) => {
      if (!filters[name]) {
        filters[name] = new Set();
      }

      if (typeof value === 'string') {
        filters[name].add(value);
      } else {
        value.forEach((v) => {
          filters[name].add(v);
        });
      }
    });
  });

  Object.keys(filters).forEach((key) => {
    filters[key] = Array.from(filters[key]);
  });

  return filters;
}

function filterBySpecs(subcategoryProducts, searchParams) {
  let filters = {};

  Array.from(searchParams).forEach(([key, value]) => {
    if (!filters[key]) {
      filters[key] = [];
    }

    filters[key].push(value);
  });

  filters = Object.entries(filters);

  const filteredProducts = [];

  subcategoryProducts.forEach((p) => {
    const productFilters = p['specs-filters'];

    let isSuitable = true;

    filters.forEach(([name, value]) => {
      if (productFilters[name]) {
        if (typeof productFilters[name] === 'string') {
          if (!value.includes(productFilters[name])) {
            isSuitable = false;
          }
        } else if (typeof productFilters[name] === 'object') {
          let includesSuitableValue = false;

          productFilters[name].forEach((pfValue) => {
            if (value.includes(pfValue)) includesSuitableValue = true;
          });

          isSuitable = includesSuitableValue;
        }
      } else {
        isSuitable = false;
      }
    });

    if (isSuitable) filteredProducts.push(p);
  });

  return filteredProducts;
}

function getMinAndMaxPrice(subcategoryProducts) {
  const prices = subcategoryProducts.map((p) => +p.price);
  prices.sort((a, b) => a - b);

  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];

  return {
    minPrice,
    maxPrice,
  };
}

function filterByPrice(subcategoryProducts, minPrice, maxPrice) {
  if (minPrice === null) return subcategoryProducts;

  return subcategoryProducts.filter((p) => +p.price >= +minPrice && +p.price <= +maxPrice);
}

function sortByType(subcategoryProducts, sortType) {
  let sortedProducts;

  switch (sortType) {
    case 'name-A-Z': {
      sortedProducts = subcategoryProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
    case 'name-Z-A': {
      sortedProducts = subcategoryProducts.sort((a, b) => -a.name.localeCompare(b.name));
      break;
    }
    case 'price-down': {
      sortedProducts = subcategoryProducts.sort((a, b) => +b.price - +a.price);
      break;
    }
    case 'price-up': {
      sortedProducts = subcategoryProducts.sort((a, b) => +a.price - +b.price);
      break;
    }
    default: {
      sortedProducts = subcategoryProducts;
    }
  }

  return sortedProducts;
}

function getPageAmount(productAmount, perView) {
  if (perView === null) perView = 12;

  return Math.ceil(+productAmount / +perView);
}

function getProductsPerPage(subcategoryProducts, perView, pageNum, pageAmount) {
  if (perView === null) perView = 12;
  if (pageNum === null || pageNum > pageAmount) pageNum = 1;

  const firstPageProduct = (+pageNum - 1) * +perView;
  const lastPageProduct = +pageNum * +perView;

  return subcategoryProducts.slice(firstPageProduct, lastPageProduct);
}

export async function getFilteredProductsAndMinMaxPrice(categoryId, subcategoryId, searchParams) {
  await fakeNetwork();

  const category = products.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategoryProducts = Object.values(subcategory.products.entities);

  const searchParamsMinPrice = searchParams.get('minPrice');
  const searchParamsMaxPrice = searchParams.get('maxPrice');

  searchParams.delete('minPrice');
  searchParams.delete('maxPrice');

  const sortBy = searchParams.get('sortBy');
  searchParams.delete('sortBy');
  const perView = searchParams.get('perView');
  searchParams.delete('perView');
  const pageNum = searchParams.get('page');
  searchParams.delete('page');

  let filteredProducts = filterBySpecs(subcategoryProducts, searchParams);
  const { minPrice, maxPrice } = getMinAndMaxPrice(filteredProducts);

  filteredProducts = filterByPrice(filteredProducts, searchParamsMinPrice, searchParamsMaxPrice);

  let filteredAndSortedProducts = sortByType(filteredProducts, sortBy);

  const productAmount = filteredAndSortedProducts.length;
  const pageAmount = getPageAmount(productAmount, perView);

  filteredAndSortedProducts = getProductsPerPage(
    filteredAndSortedProducts,
    perView,
    pageNum,
    pageAmount,
  );

  const subcategoryFilters = getSubcategoryFilters(subcategoryProducts);

  const body = JSON.stringify({
    subcategoryFilters,
    filteredAndSortedProducts,
    minPrice,
    maxPrice,
    productAmount,
    pageAmount,
  });

  return new Response(body, { status: 200, statusText: 'OK' });
}

export async function getProduct(categoryId, subcategoryId, productId) {
  await fakeNetwork();

  const product = getProductFullObj(categoryId, subcategoryId, productId);

  return new Response(JSON.stringify(product), { status: 200, statusText: 'OK' });
}

export async function getAnalogueProducts(categoryId, subcategoryId, productId) {
  await fakeNetwork();

  const category = products.categories.entities[categoryId];
  const subcategory = category.subcategories.entities[subcategoryId];
  const subcategoryProducts = Object.values(subcategory.products.entities)
    .filter((p) => p.id !== productId);

  const randomProducts = (subcategoryProducts.sort(() => 0.5 - Math.random())).slice(0, 8);

  return new Response(JSON.stringify(randomProducts), { status: 200, statusText: 'OK' });
}

export async function getWishlistIds() {
  await fakeNetwork();

  return getLocalStorageIds('wishlistIds');
}

export function addIdToWishlist(categoryId, subcategoryId, productId) {
  const newIdEntitity = [categoryId, subcategoryId, productId];
  const findFunc = ([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return addIdToStorage('wishlistIds', newIdEntitity, findFunc);
}

export function deleteIdFromWishlist(categoryId, subcategoryId, productId) {
  const findFunction = ([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return deleteIdFromStorage('wishlistIds', findFunction);
}

export async function deleteAllFromWishlist() {
  await fakeNetwork();

  return deleteAllFromStorage('wishlistIds');
}

export async function getWishlistProductsPerPageAndPageAmount(pageNum) {
  await fakeNetwork();

  const perView = 12;
  const allWishlistProducts = getAllProductsFromStorage('wishlistIds');
  const wishlistProductsAmount = allWishlistProducts.length;
  const pageAmount = getPageAmount(wishlistProductsAmount, perView);

  if (pageNum === null || pageNum > pageAmount) pageNum = 1;

  const firstPageProduct = (+pageNum - 1) * perView;
  const lastPageProduct = +pageNum * perView;

  const wishlistProducts = allWishlistProducts.slice(firstPageProduct, lastPageProduct);

  const body = JSON.stringify({
    totalProductAmount: wishlistProductsAmount,
    wishlistProducts,
    pageAmount,
  });

  return new Response(body, { status: 200, statusText: 'OK' });
}

export async function getCartIds() {
  await fakeNetwork();

  return getLocalStorageIds('cartIds');
}

export function addIdToCart(categoryId, subcategoryId, productId) {
  const newIdEntitity = {
    categoryId,
    subcategoryId,
    productId,
    amount: 1,
  };
  const findFunc = (cId) => (cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);

  return addIdToStorage('cartIds', newIdEntitity, findFunc);
}

export async function editProductAmountInCart(categoryId, subcategoryId, productId, newAmount) {
  await fakeNetwork();

  const cartIds = getLocalStorageIds('cartIds');

  const cartObj = cartIds.find((cId) => cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);
  cartObj.amount = newAmount;

  localStorage.setItem('cartIds', JSON.stringify(cartIds));

  return new Response(null, { status: 200, statusText: 'OK' });
}

export function deleteFromCart(categoryId, subcategoryId, productId) {
  const findFunction = (cId) => (cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);

  return deleteIdFromStorage('cartIds', findFunction);
}

export async function deleteAllFromCart() {
  await fakeNetwork();

  return deleteAllFromStorage('cartIds');
}

export async function getCartProducts() {
  await fakeNetwork();

  const cartIds = getLocalStorageIds('cartIds');

  return cartIds.map((idObj) => {
    const productObj = getProductCard(idObj.categoryId, idObj.subcategoryId, idObj.productId);
    productObj.amount = idObj.amount;

    return productObj;
  });
}

export async function getCompareIds() {
  await fakeNetwork();

  return getLocalStorageIds('compareIds');
}

export function addIdToCompare(categoryId, subcategoryId, productId) {
  const newIdEntitity = [categoryId, subcategoryId, productId];
  const findFunc = ([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return addIdToStorage('compareIds', newIdEntitity, findFunc);
}

export function deleteFromCompare(categoryId, subcategoryId, productId) {
  const findFunction = ([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return deleteIdFromStorage('compareIds', findFunction);
}

export async function getCompareSubcategories() {
  await fakeNetwork();

  const compareIds = getLocalStorageIds('compareIds');

  const uniqueCompareCategoryAndSubcategory = [];
  compareIds.forEach(([cId, subcId]) => {
    const isAlreadyExist = uniqueCompareCategoryAndSubcategory
      .find(([uCId, uSubcId]) => uCId === cId && uSubcId === subcId);

    if (!isAlreadyExist) uniqueCompareCategoryAndSubcategory.push([cId, subcId]);
  });

  const compareSubcategoriesBtnInfo = uniqueCompareCategoryAndSubcategory.map(([cId, subcId]) => {
    const { categoryId, subcategory } = getCategoryAndSubcategory(cId, subcId);

    return {
      categoryId,
      subcategoryId: subcategory.id,
      subcategoryName: subcategory.name,
    };
  });

  const data = JSON.stringify(compareSubcategoriesBtnInfo);

  return new Response(data, { status: 200, statusText: 'OK' });
}

export async function deleteCompareSubcategory(categoryId, subcategoryId) {
  await fakeNetwork();

  let compareIds = getLocalStorageIds('compareIds');
  compareIds = compareIds.filter(([cId, sId]) => cId !== categoryId && sId !== subcategoryId);
  compareIds = JSON.stringify(compareIds);

  localStorage.setItem('compareIds', compareIds);

  return new Response(null, { status: 200, statusText: 'OK' });
}

export async function deleteAllCompareSubcategories() {
  await fakeNetwork();

  localStorage.setItem('compareIds', JSON.stringify([]));

  return new Response(null, { status: 200, statusText: 'OK' });
}

export async function getCompareProductCards(categoryId, subcategoryId) {
  await fakeNetwork();

  if (categoryId === null || subcategoryId === null) throw new Response(null, { status: 404, statusText: 'Not found' });

  let compareIds = getLocalStorageIds('compareIds');

  compareIds = compareIds.filter(([cId, subcId]) => cId === categoryId && subcId === subcategoryId);

  const productCards = compareIds.map(([cId, subcId, pId]) => getProductFullObj(cId, subcId, pId));

  return new Response(JSON.stringify(productCards), { status: 200, statusText: 'OK' });
}

// news API

export async function getNewsPreviews() {
  await fakeNetwork();

  const newsFullObjs = Object.values(news.entities);
  const newsShortObjs = newsFullObjs.map((n) => ({
    name: n.name,
    id: n.id,
    date: n.date,
    views: n.views,
  }));

  return newsShortObjs;
}

// =====

export async function getCategoryAndSubcategories(categoryId) {
  await fakeNetwork();

  const category = products.find((c) => c.id === categoryId);

  if (!category) throw new Error('Категорію не знайдено');

  const subcategories = category.subcategories.map((subC) => ({
    name: subC.name,
    id: subC.id,
    imgId: subC.imgId,
    imgAlt: subC.imgAlt,
  }));

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategories,
  };
}

export async function getRandomProduct() {
  await fakeNetwork();

  const { categoryId, subcategory } = getCategoryAndSubcategory('enamels', 'alkyd_enamels');
  const subcategoryProducts = subcategory.products.slice(0);

  const randomProduct = (subcategoryProducts.sort(() => 0.5 - Math.random()))[0];

  return {
    categoryId,
    subcategoryId: subcategory.id,
    product: randomProduct,
  };
}

async function getAllSearchResults(searchQuery) {
  await fakeNetwork();

  const firstOrderRegExp = new RegExp(`^${searchQuery}`, 'i');
  const lastOrderRegExp = new RegExp(`${searchQuery}`, 'i');

  const allCategories = [];
  const allSubcategories = [];
  const allProducts = [];
  const allNews = [];
  const firstOrderResults = [];
  const lastOrderResults = [];

  products.forEach((c) => {
    allCategories.push({
      id: c.id,
      name: c.name,
    });

    c.subcategories.forEach((s) => {
      allSubcategories.push({
        categoryId: c.id,
        id: s.id,
        name: s.name,
      });

      s.products?.forEach((p) => allProducts.push({
        categoryId: c.id,
        subcategoryId: s.id,
        product: p,
      }));
    });
  });

  news.forEach((n) => {
    allNews.push({
      id: n.id,
      name: n.name,
    });
  });

  allCategories.forEach((c) => {
    if (firstOrderRegExp.test(c.name)) {
      firstOrderResults.push({
        type: 'category',
        category: c,
      });
    } else if (lastOrderRegExp.test(c.name)) {
      lastOrderResults.push({
        type: 'category',
        category: c,
      });
    }
  });

  allSubcategories.forEach((s) => {
    if (firstOrderRegExp.test(s.name)) {
      firstOrderResults.push({
        type: 'subcategory',
        subcategory: s,
      });
    } else if (lastOrderRegExp.test(s.name)) {
      lastOrderResults.push({
        type: 'subcategory',
        subcategory: s,
      });
    }
  });

  allProducts.forEach((p) => {
    if (firstOrderRegExp.test(p.product.name)) {
      firstOrderResults.push({
        type: 'product',
        product: p,
      });
    } else if (lastOrderRegExp.test(p.product.name)) {
      lastOrderResults.push({
        type: 'product',
        product: p,
      });
    }
  });

  allNews.forEach((n) => {
    if (firstOrderRegExp.test(n.name)) {
      firstOrderResults.push({
        type: 'news',
        news: n,
      });
    } else if (lastOrderRegExp.test(n.name)) {
      lastOrderResults.push({
        type: 'news',
        news: n,
      });
    }
  });

  const result = [...firstOrderResults, ...lastOrderResults];

  return result;
}

export async function getSearchResultsPerPageAndPageAmount(searchQuery, pageNum) {
  const perView = 12;
  const allSearchResults = await getAllSearchResults(searchQuery);
  const searchResultsAmount = allSearchResults.length;
  const pageAmount = getPageAmount(searchResultsAmount, perView);

  if (!pageNum || pageNum > pageAmount) pageNum = 1;

  const firstPageProduct = (+pageNum - 1) * perView;
  const lastPageProduct = +pageNum * perView;

  const searchResults = allSearchResults.slice(firstPageProduct, lastPageProduct);

  return {
    searchResults,
    pageAmount,
  };
}

// news

async function getAllNewsPreviews() {
  await fakeNetwork();

  const newsPreviews = news.map((n) => ({
    name: n.name,
    id: n.id,
    date: n.date,
    views: n.views,
  }));

  return newsPreviews;
}

export async function getFourNewsPreviews() {
  const newsPreviews = (await getAllNewsPreviews()).slice(0, 4);

  return newsPreviews;
}

function getNewsPreviewsPerPage(allNewsPreviews, pageAmount, perView, pageNum) {
  if (pageNum === null || pageNum > pageAmount) pageNum = 1;

  const firstPageNewsPreview = (+pageNum - 1) * +perView;
  const lastPageNewsPreview = +pageNum * +perView;

  return allNewsPreviews.slice(firstPageNewsPreview, lastPageNewsPreview);
}

export async function getNewsPreviewsPerPageAndPageAmount(pageNum) {
  const allNewsPreviews = await getAllNewsPreviews();
  const allNewsPreviewsAmount = allNewsPreviews.length;
  const perView = 12;

  const pageAmount = getPageAmount(allNewsPreviewsAmount, perView);
  const newsPreviewsPerPage = getNewsPreviewsPerPage(allNewsPreviews, pageAmount, perView, pageNum);

  return {
    pageAmount,
    newsPreviews: newsPreviewsPerPage,
  };
}

export async function getNewsArticle(id) {
  await fakeNetwork();

  const article = news.find((n) => n.id === id);

  if (!article) throw new Error('Статтю не знайдено');

  return article;
}

export async function getRecommendedNews(id) {
  const allNewsPreviews = await getAllNewsPreviews();
  const index = news.findIndex((n) => n.id === id);
  allNewsPreviews.splice(index, 1);

  const recommendedNews = (allNewsPreviews.sort(() => 0.5 - Math.random())).slice(0, 3);

  return recommendedNews;
}
