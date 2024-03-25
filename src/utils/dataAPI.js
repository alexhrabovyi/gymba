import products from './products.json';
import news from './news.json';

export function getCategoriesAndSubcategories() {
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

export function getCategoryAndSubcategories(categoryId) {
  const category = products.find((c) => c.id === categoryId);

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
  const subcategory = category.subcategories.find((s) => s.id === subcategoryId);

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategory,
  };
}

export function getProduct(categoryId, subcategoryId, productId) {
  const category = products.find((c) => c.id === categoryId);
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

export function getSubcategoryFilters(categoryId, subcategoryId) {
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

export function getFilteredProductsAndMinMaxPrice(categoryId, subcategoryId, searchParams) {
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

export function getWishlistIds() {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlistIds')) || [];

  return wishlistIds;
}

export function getWishlistAmount() {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlistIds')) || [];

  return wishlistIds.length;
}

export function getAllWishlistProducts() {
  const wishlistIds = getWishlistIds();
  const wishlistProducts = wishlistIds.map((ids) => getProduct(...ids));

  return wishlistProducts;
}

export function getWishlistProductsPerPageAndPageAmount(pageNum) {
  const perView = 12;
  const allWishlistProducts = getAllWishlistProducts();
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
    cartIds.push([categoryId, subcategoryId, productId]);
    localStorage.setItem('cartIds', JSON.stringify(cartIds));
  } else {
    cartIds = JSON.parse(cartIds);

    const isAlreadyExist = cartIds.find(([cId, subcId, pId]) => (cId === categoryId
      && subcId === subcategoryId && pId === productId));

    if (!isAlreadyExist) {
      cartIds.push([categoryId, subcategoryId, productId]);
      localStorage.setItem('cartIds', JSON.stringify(cartIds));
    }
  }
}

export function deleteFromCart(categoryId, subcategoryId, productId) {
  const cartIds = JSON.parse(localStorage.getItem('cartIds')) || [];

  const index = cartIds.findIndex(([cId, subcId, pId]) => (cId === categoryId
    && subcId === subcategoryId && pId === productId));

  if (index !== -1) cartIds.splice(index, 1);

  localStorage.setItem('cartIds', JSON.stringify(cartIds));
}

export function getCartIds() {
  const cartIds = JSON.parse(localStorage.getItem('cartIds')) || [];

  return cartIds;
}

export function getCartAmount() {
  const cartIds = JSON.parse(localStorage.getItem('cartIds')) || [];

  return cartIds.length;
}

export function getAnalogueProducts(categoryId, subcategoryId, productId) {
  const { subcategories } = products.find((c) => c.id === categoryId);
  const subcategoryProducts = (subcategories.find((s) => s.id === subcategoryId)).products
    .filter((p) => p.id !== productId);
  const randomProducts = (subcategoryProducts.sort(() => 0.5 - Math.random())).slice(0, 8);

  return randomProducts;
}
// news

export function getNewsPreviews() {
  const newsPrevies = news.map((n) => ({
    name: n.name,
    id: n.id,
    date: n.date,
    views: n.views,
    previewImgId: n.previewImgId,
  }));

  return newsPrevies;
}
