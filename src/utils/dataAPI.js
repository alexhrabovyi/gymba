/* eslint-disable no-return-assign */
import products from './products.json';
import news from './news.json';

// async function fakeNetwork() {
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 3000);
  });
}

export async function getCategoriesAndSubcategories() {
  await fakeNetwork();

  const categories = products.map((c) => {
    const dataSubcategories = c.subcategories;

    const subcategories = dataSubcategories.map((subC) => ({
      name: subC.name,
      id: subC.id,
    }));

    return {
      name: c.name,
      id: c.id,
      imgId: c.imgId,
      imgAlt: c.imgAlt,
      subcategories,
    };
  });

  return categories;
}

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

export function getCategoryAndSubcategory(categoryId, subcategoryId) {
  const category = products.find((c) => c.id === categoryId);

  if (!category) throw new Error('Категорію не знайдено');

  const subcategory = category.subcategories.find((s) => s.id === subcategoryId);

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategory,
  };
}

export async function getProduct(categoryId, subcategoryId, productId) {
  await fakeNetwork();

  const category = products.find((c) => c.id === categoryId);

  if (!category) throw new Error('Категорію не знайдено');

  const subcategory = category.subcategories.find((s) => s.id === subcategoryId);
  const product = subcategory.products.find((p) => p.id === productId);

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategoryName: subcategory.name,
    subcategoryId: subcategory.id,
    product,
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

export async function getSubcategoryFilters(categoryId, subcategoryId) {
  await fakeNetwork();

  const subCategoryProducts = getCategoryAndSubcategory(categoryId, subcategoryId)
    .subcategory.products;

  const filters = {};

  subCategoryProducts.forEach((p) => {
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

  return filters;
}

async function filterBySpecs(subcategoryProducts, searchParams) {
  await fakeNetwork();

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
  const category = products.find((c) => c.id === categoryId);
  const subcategory = category.subcategories.find((s) => s.id === subcategoryId);
  const subcategoryProducts = subcategory.products;

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

  let filteredProducts = await filterBySpecs(subcategoryProducts, searchParams);
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

  return {
    filteredAndSortedProducts,
    minPrice,
    maxPrice,
    productAmount,
    pageAmount,
  };
}

export function addIdToWishlist(categoryId, subcategoryId, productId) {
  let wishlistIds = localStorage.getItem('wishlistIds');

  if (wishlistIds === null) {
    wishlistIds = [];
    wishlistIds.push([categoryId, subcategoryId, productId]);
    localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds));
  } else {
    wishlistIds = JSON.parse(wishlistIds);

    const isAlreadyExist = wishlistIds.find(([cId, subcId, pId]) => (cId === categoryId
      && subcId === subcategoryId && pId === productId));

    if (!isAlreadyExist) {
      wishlistIds.push([categoryId, subcategoryId, productId]);
      localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds));
    }
  }
}

export function deleteFromWishlist(categoryId, subcategoryId, productId) {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlistIds')) || [];

  const index = wishlistIds.findIndex(([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId));

  if (index !== -1) wishlistIds.splice(index, 1);

  localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds));
}

export function deleteAllFromWishlist() {
  localStorage.removeItem('wishlistIds');
}

export async function getWishlistIds() {
  await fakeNetwork();

  const wishlistIds = JSON.parse(localStorage.getItem('wishlistIds')) || [];

  return wishlistIds;
}

export async function getWishlistAmount() {
  const wishlistIds = await getWishlistIds();

  return wishlistIds.length;
}

export async function getAllWishlistProducts() {
  const wishlistIds = await getWishlistIds();

  const wishlistProducts = await Promise.all(wishlistIds.map((ids) => getProduct(...ids)));

  return wishlistProducts;
}

export async function getWishlistProductsPerPageAndPageAmount(pageNum) {
  const perView = 12;
  const allWishlistProducts = await getAllWishlistProducts();
  const wishlistProductsAmount = allWishlistProducts.length;
  const pageAmount = getPageAmount(wishlistProductsAmount, perView);

  if (pageNum === null || pageNum > pageAmount) pageNum = 1;

  const firstPageProduct = (+pageNum - 1) * perView;
  const lastPageProduct = +pageNum * perView;

  const wishlistProducts = allWishlistProducts.slice(firstPageProduct, lastPageProduct);

  return {
    wishlistProducts,
    pageAmount,
  };
}

export function addIdToCart(categoryId, subcategoryId, productId) {
  let cartIds = localStorage.getItem('cartIds');

  if (cartIds === null) {
    cartIds = [];
    cartIds.push({
      categoryId,
      subcategoryId,
      productId,
      amount: 1,
    });
    localStorage.setItem('cartIds', JSON.stringify(cartIds));
  } else {
    cartIds = JSON.parse(cartIds);

    const isAlreadyExist = cartIds.find((cId) => (cId.categoryId === categoryId
      && cId.subcategoryId === subcategoryId && cId.productId === productId));

    if (!isAlreadyExist) {
      cartIds.push({
        categoryId,
        subcategoryId,
        productId,
        amount: 1,
      });
      localStorage.setItem('cartIds', JSON.stringify(cartIds));
    }
  }
}

export function deleteFromCart(categoryId, subcategoryId, productId) {
  const cartIds = JSON.parse(localStorage.getItem('cartIds')) || [];

  const index = cartIds.findIndex((cId) => (cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId));

  if (index !== -1) cartIds.splice(index, 1);

  localStorage.setItem('cartIds', JSON.stringify(cartIds));
}

export function deleteAllFromCart() {
  localStorage.removeItem('cartIds');
}

export async function getCartIds() {
  await fakeNetwork();

  const cartIds = JSON.parse(localStorage.getItem('cartIds')) || [];

  return cartIds;
}

export async function getCartAmount() {
  const cartIds = await getCartIds();

  return cartIds.length;
}

export async function editProductAmountInCart(categoryId, subcategoryId, productId, newAmount) {
  const cartIds = await getCartIds();

  const cartObj = cartIds.find((cId) => cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);
  cartObj.amount = newAmount;

  localStorage.setItem('cartIds', JSON.stringify(cartIds));
}

async function getCartProducts() {
  const cartIds = await getCartIds();

  const cartProductPromises = await Promise.all(cartIds.map((cId) => (
    getProduct(cId.categoryId, cId.subcategoryId, cId.productId)
  )));

  const cartProducts = cartIds.map((cId, i) => {
    const product = cartProductPromises[i];
    const { amount } = cId;
    const totalPrice = +product.product.price * +amount;

    return {
      ...product,
      amount,
      totalPrice,
    };
  });

  return cartProducts;
}

function getCartTotalPrice(cartProducts) {
  return cartProducts.reduce((totalPrice, cP) => totalPrice += cP.totalPrice, 0);
}

export async function getCartProductsAndTotalPrice() {
  const cartProducts = await getCartProducts();
  const totalPrice = getCartTotalPrice(cartProducts);

  return {
    cartProducts,
    totalPrice,
  };
}

export function addIdToCompare(categoryId, subcategoryId, productId) {
  let compareIds = localStorage.getItem('compareIds');

  if (compareIds === null) {
    compareIds = [];
    compareIds.push([categoryId, subcategoryId, productId]);
    localStorage.setItem('compareIds', JSON.stringify(compareIds));
  } else {
    compareIds = JSON.parse(compareIds);

    const isAlreadyExist = compareIds.find((cId, subcId, pId) => (cId === categoryId
      && subcId === subcategoryId && pId === productId));

    if (!isAlreadyExist) {
      compareIds.push([categoryId, subcategoryId, productId]);
      localStorage.setItem('compareIds', JSON.stringify(compareIds));
    }
  }
}

export function deleteFromCompare(categoryId, subcategoryId, productId) {
  const compareIds = JSON.parse(localStorage.getItem('compareIds')) || [];

  const index = compareIds.findIndex(([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId));

  if (index !== -1) compareIds.splice(index, 1);

  localStorage.setItem('compareIds', JSON.stringify(compareIds));
}

export function deleteAllFromCompare() {
  localStorage.removeItem('compareIds');
}

export async function getCompareIds() {
  await fakeNetwork();

  const compareIds = JSON.parse(localStorage.getItem('compareIds')) || [];

  return compareIds;
}

export async function getCompareAmount() {
  const compareIds = await getCompareIds();

  return compareIds.length;
}

export async function getCompareSubcategoriesBtnInfo() {
  const compareIds = await getCompareIds();

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

  return compareSubcategoriesBtnInfo;
}

export async function deleteSubcFromCompare(categoryId, subcategoryId) {
  let compareIds = await getCompareIds();

  compareIds = compareIds.filter(([cId, subcId]) => cId !== categoryId
    || (cId === categoryId && subcId !== subcategoryId));

  localStorage.setItem('compareIds', JSON.stringify(compareIds));
}

export async function getCompareProductCards(categoryId, subcategoryId) {
  if (categoryId === null || subcategoryId === null) throw new Error('Некорректний запит');

  let compareIds = await getCompareIds();

  compareIds = compareIds.filter(([cId, subcId]) => cId === categoryId && subcId === subcategoryId);

  const productCards = await Promise
    .all(compareIds.map(([cId, subcId, pId]) => getProduct(cId, subcId, pId)));

  return productCards;
}

export function getAnalogueProducts(categoryId, subcategoryId, productId) {
  const { subcategories } = products.find((c) => c.id === categoryId);
  const subcategoryProducts = (subcategories.find((s) => s.id === subcategoryId)).products
    .filter((p) => p.id !== productId);
  const randomProducts = (subcategoryProducts.sort(() => 0.5 - Math.random())).slice(0, 8);

  return randomProducts;
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

export function getNewsPreviewsPerPageAndPageAmount(pageNum) {
  const allNewsPreviews = getAllNewsPreviews();
  const allNewsPreviewsAmount = allNewsPreviews.length;
  const perView = 12;

  const pageAmount = getPageAmount(allNewsPreviewsAmount, perView);
  const newsPreviewsPerPage = getNewsPreviewsPerPage(allNewsPreviews, pageAmount, perView, pageNum);

  return {
    pageAmount,
    newsPreviews: newsPreviewsPerPage,
  };
}

export function getNewsArticle(id) {
  const article = news.find((n) => n.id === id);

  if (!article) throw new Error('Статтю не знайдено');

  return article;
}

export function getRecommendedNews(id) {
  const allNewsPreviews = getAllNewsPreviews();
  const index = news.findIndex((n) => n.id === id);
  allNewsPreviews.splice(index, 1);

  const recommendedNews = (allNewsPreviews.sort(() => 0.5 - Math.random())).slice(0, 3);

  return recommendedNews;
}

// breadCrumbs

export async function getBreadCrumbsInfo(requestList) {
  await fakeNetwork();

  const result = {};

  if (requestList.categoryId) {
    const category = products.find((c) => c.id === requestList.categoryId);

    result.category = {
      id: category.id,
      name: category.name,
      link: `/${category.id}`,
    };

    if (requestList.subcategoryId) {
      const subcategory = category.subcategories.find((s) => s.id === requestList.subcategoryId);

      result.subcategory = {
        id: subcategory.id,
        name: subcategory.name,
        link: `/${category.id}/${subcategory.id}`,
      };
    }
  }

  return result;
}
