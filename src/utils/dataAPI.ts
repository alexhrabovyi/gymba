import products from './products.json';
import news from './news.json';

// types

export interface Product {
  name: string,
  id: string,
  price: string,
  oldPrice?: string,
  additionalImgs?: string[],
  'specs-filters': {
    [i: string]: string | string[],
  },
  specs: {
    [i: string]: string,
  },
  mainSpecs: {
    [i: string]: string,
  },
  description?: string,
}

interface Subcategory {
  name: string,
  id: string,
  imgAlt?: string,
  products: {
    ids: string[],
    entities: {
      [id: string]: Product | undefined,
    },
  }
}

interface SubcategoryShort extends Omit<Subcategory, 'products'> { }

interface Category {
  name: string,
  id: string,
  imgAlt: string,
  subcategories: {
    ids: string[],
    entities: {
      [id: string]: Subcategory | undefined,
    },
  }
}

export interface CategoryShort extends Omit<Category, 'subcategories'> {
  subcategories: {
    ids: string[],
    entities: {
      [id: string]: SubcategoryShort | undefined,
    },
  }
}

interface JSON {
  categories: {
    ids: string[],
    entities: {
      [index: string]: Category | undefined,
    }
  }
}

interface CategoryWithSubcategory {
  categoryName: Category['name'],
  categoryId: Category['id'],
  categoryImgAlt: Category['imgAlt'],
  subcategory: Subcategory,
}

export interface ProductWithIds {
  categoryId: Category['id'],
  subcategoryId: Subcategory['id'],
  product: Product,
}

export interface ProductWithIdsAndNames extends ProductWithIds {
  categoryName: Category['name'],
  subcategoryName: Subcategory['name'],
}

export type WishlistId = [string, string, string];
export type CompareId = [string, string, string];
export interface CartId {
  categoryId: string,
  subcategoryId: string,
  productId: string,
  amount: number,
}

interface NewsQuoteContent {
  contentType: string,
  elements: [string],
}

interface NewsTableContent {
  contentType: string,
  columnHeaders: string[],
  rows: string[][],
}

interface NewsListContent {
  contentType: string,
  elements: string[],
}

interface NewsParagraphContent {
  contentType: string,
  elements: [string],
}

interface NewsImgContent {
  contentType: string,
  imgId: string,
  imgAlt: string,
}

interface NewsContent {
  titleType?: string,
  title?: string,
  content: (NewsQuoteContent
    | NewsTableContent | NewsListContent | NewsParagraphContent | NewsImgContent)[],
}

interface NewsArticle {
  name: string,
  id: string,
  date: string,
  views: string,
  description: NewsContent[],
}

export interface NewsArticleShort extends Omit<NewsArticle, 'description'> { }

// utils

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

function getCategoryAndSubcategory(
  categoryId: string,
  subcategoryId: string,
): CategoryWithSubcategory {
  const categoryEntities: Record<string, Category> = products.categories.entities;

  const category: Category | undefined = categoryEntities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory: Subcategory | undefined = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  return {
    categoryName: category.name,
    categoryId: category.id,
    categoryImgAlt: category.imgAlt,
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

function getProductFullObj(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): ProductWithIdsAndNames {
  const parsedJSON: JSON = products;

  const category: Category | undefined = parsedJSON.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory: Subcategory | undefined = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const product: Product | undefined = subcategory.products.entities[productId];

  if (!product) throw new Response(null, { status: 404, statusText: 'Not found' });

  return {
    categoryName: category.name,
    categoryId: category.id,
    subcategoryName: subcategory.name,
    subcategoryId: subcategory.id,
    product,
  };
}

function getLocalStorageIds<T>(localStorageKey: string): T[] | [] {
  const unparsedIds = localStorage.getItem(localStorageKey)
  const ids = unparsedIds ? JSON.parse(unparsedIds) : [];;

  return ids;
}

async function addIdToStorage<E>(
  localStorageKey: string,
  entitityToAdd: E,
  findFunc: (arg: E) => boolean,
): Promise<Response> {
  await fakeNetwork();

  const ids = localStorage.getItem(localStorageKey);

  let newIds: E[];

  if (ids === null) {
    newIds = [];

    newIds.push(entitityToAdd);
    localStorage.setItem(localStorageKey, JSON.stringify(newIds));
  } else {
    newIds = JSON.parse(ids);

    const isAlreadyExist = newIds.find(findFunc);

    if (!isAlreadyExist) {
      newIds.push(entitityToAdd);
      localStorage.setItem(localStorageKey, JSON.stringify(newIds));
    }
  }

  return new Response(null, { status: 200, statusText: 'OK' });
}

async function deleteIdFromStorage<E>(
  localStorageKey: string,
  findFunc: (arg: E) => boolean,
) {
  await fakeNetwork();

  const unparsedIds = localStorage.getItem(localStorageKey);

  const ids: E[] = unparsedIds ? JSON.parse(unparsedIds) : [];

  const index = ids.findIndex(findFunc);

  if (index !== -1) ids.splice(index, 1);

  localStorage.setItem(localStorageKey, JSON.stringify(ids));

  return new Response(null, { status: 200, statusText: 'OK' });
}

function deleteAllFromStorage(localStorageKey: string): Response {
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

export interface Filters {
  [index: string]: string[]
}

export async function getCategoriesAndSubcategories(): Promise<CategoryShort[]> {
  await fakeNetwork();

  const categoriesFullObjs: Category[] = Object.values(products.categories.entities);

  const categoriesShortObjs: CategoryShort[] = categoriesFullObjs.map((c) => {
    const subcategoriesIds: Category['subcategories']['ids'] = c.subcategories.ids;

    const subcategoriesFullObjs: Subcategory[] = Object
      .values(c.subcategories.entities) as Subcategory[];
    const subcategoriesShortObjs: SubcategoryShort[] = subcategoriesFullObjs.map((subC) => ({
      name: subC.name,
      id: subC.id,
      imgAlt: subC.imgAlt,
    }));

    const subcategoryEntities: { [id: string]: SubcategoryShort } = {};

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

function getSubcategoryFilters(subcategoryProducts: Product[]) {
  interface SetFilters {
    [index: string]: Set<string>,
  }

  const filters: SetFilters = {};

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

  const arrishFiltes: Filters = {};

  Object.keys(filters).forEach((key) => {
    arrishFiltes[key] = Array.from(filters[key]);
  });

  return arrishFiltes;
}

function filterBySpecs(subcategoryProducts: Product[], searchParams: URLSearchParams): Product[] {
  const filters: Filters = {};

  Array.from(searchParams).forEach(([key, value]) => {
    if (!filters[key]) {
      filters[key] = [];
    }

    filters[key].push(value);
  });

  const filterEntries = Object.entries(filters);

  const filteredProducts: Product[] = [];

  subcategoryProducts.forEach((p) => {
    const productFilters = p['specs-filters'];

    let isSuitable = true;

    filterEntries.forEach(([name, value]) => {
      if (productFilters[name]) {
        if (typeof productFilters[name] === 'string') {
          if (!value.includes(productFilters[name] as string)) {
            isSuitable = false;
          }
        } else if (typeof productFilters[name] === 'object') {
          let includesSuitableValue = false;

          (productFilters[name] as string[]).forEach((pfValue) => {
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

function getMinAndMaxPrice(subcategoryProducts: Product[]): {
  minPrice: number,
  maxPrice: number,
} {
  const prices = subcategoryProducts.map((p) => +p.price);
  prices.sort((a, b) => a - b);

  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];

  return {
    minPrice,
    maxPrice,
  };
}

function filterByPrice(
  subcategoryProducts: Product[],
  minPrice: string | null,
  maxPrice: string | null,
): Product[] {
  if (minPrice === null) return subcategoryProducts;
  if (maxPrice === null) return subcategoryProducts;

  return subcategoryProducts.filter((p) => +p.price >= +minPrice && +p.price <= +maxPrice);
}

function sortByType(subcategoryProducts: Product[], sortType: string | null): Product[] {
  let sortedProducts: Product[];

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

function getPageAmount(productAmount: number, perView: number | null): number {
  if (perView === null) perView = 12;

  return Math.ceil(+productAmount / +perView);
}

function getProductsPerPage(
  subcategoryProducts: Product[],
  perView: number | null,
  pageNum: number | string | null,
  pageAmount: number,
): Product[] {
  if (perView === null) perView = 12;
  if (pageNum === null || Number(pageNum) > pageAmount) pageNum = 1;

  const firstPageProduct = (+pageNum - 1) * +perView;
  const lastPageProduct = +pageNum * +perView;

  return subcategoryProducts.slice(firstPageProduct, lastPageProduct);
}

export interface FilteredProductsAndMinMaxPrice {
  subcategoryFilters: Filters,
  filteredAndSortedProducts: Product[],
  minPrice: number,
  maxPrice: number,
  productAmount: number,
  pageAmount: number,
}

export async function getFilteredProductsAndMinMaxPrice(
  categoryId: string,
  subcategoryId: string,
  searchParams: URLSearchParams,
): Promise<FilteredProductsAndMinMaxPrice> {
  await fakeNetwork();

  const parsedJSON: JSON = products;

  const category = parsedJSON.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategoryProducts = Object.values(subcategory.products.entities) as Product[];

  const searchParamsMinPrice = searchParams.get('minPrice');
  const searchParamsMaxPrice = searchParams.get('maxPrice');

  searchParams.delete('minPrice');
  searchParams.delete('maxPrice');

  const sortBy = searchParams.get('sortBy');
  searchParams.delete('sortBy');
  const perView = Number(searchParams.get('perView')) || 12;
  searchParams.delete('perView');
  const pageNum = searchParams.get('page');
  searchParams.delete('page');

  let filteredProducts: Product[] = filterBySpecs(subcategoryProducts, searchParams);
  const { minPrice, maxPrice } = getMinAndMaxPrice(filteredProducts);

  filteredProducts = filterByPrice(filteredProducts, searchParamsMinPrice, searchParamsMaxPrice);

  let filteredAndSortedProducts: Product[] = sortByType(filteredProducts, sortBy);

  const productAmount: number = filteredAndSortedProducts.length;
  const pageAmount: number = getPageAmount(productAmount, perView);

  filteredAndSortedProducts = getProductsPerPage(
    filteredAndSortedProducts,
    perView,
    pageNum,
    pageAmount,
  );

  const subcategoryFilters: Filters = getSubcategoryFilters(subcategoryProducts);

  return {
    subcategoryFilters,
    filteredAndSortedProducts,
    minPrice,
    maxPrice,
    productAmount,
    pageAmount,
  };
}

export async function getProduct(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<ProductWithIdsAndNames> {
  await fakeNetwork();

  return getProductFullObj(categoryId, subcategoryId, productId);
}

export async function getAnalogueProducts(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<Product[]> {
  await fakeNetwork();

  const parsedJSON: JSON = products;
  const category: Category | undefined = parsedJSON.categories.entities[categoryId];

  if (!category) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategory = category.subcategories.entities[subcategoryId];

  if (!subcategory) throw new Response(null, { status: 404, statusText: 'Not found' });

  const subcategoryProducts = Object.values(subcategory.products.entities)
    .filter((p) => p!.id !== productId) as Product[];

  const randomProducts = (subcategoryProducts.sort(() => 0.5 - Math.random())).slice(0, 8);

  return randomProducts;
}

export async function getWishlistIds() {
  await fakeNetwork();

  return getLocalStorageIds<WishlistId>('wishlistIds');
}

export function addIdToWishlist(categoryId: string, subcategoryId: string, productId: string) {
  const newIdEntitity: WishlistId = [categoryId, subcategoryId, productId];

  const findFunc = ([cId, subcId, pId]: WishlistId) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return addIdToStorage<WishlistId>('wishlistIds', newIdEntitity, findFunc);
}

export function deleteIdFromWishlist(categoryId: string, subcategoryId: string, productId: string) {
  const findFunction = ([cId, subcId, pId]: WishlistId) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return deleteIdFromStorage<WishlistId>('wishlistIds', findFunction);
}

export async function deleteAllFromWishlist(): Promise<Response> {
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

  return getLocalStorageIds<CartId>('cartIds');
}

export function addIdToCart(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<Response> {
  const newIdEntitity: CartId = {
    categoryId,
    subcategoryId,
    productId,
    amount: 1,
  };
  const findFunc = (cId: CartId) => (cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);

  return addIdToStorage<CartId>('cartIds', newIdEntitity, findFunc);
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

export function deleteFromCart(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<Response> {
  const findFunction = (cId: CartId) => (cId.categoryId === categoryId
    && cId.subcategoryId === subcategoryId && cId.productId === productId);

  return deleteIdFromStorage<CartId>('cartIds', findFunction);
}

export async function deleteAllFromCart(): Promise<Response> {
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

  return getLocalStorageIds<CompareId>('compareIds');
}

export function addIdToCompare(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<Response> {
  const newIdEntitity: CompareId = [categoryId, subcategoryId, productId];
  const findFunc = ([cId, subcId, pId]: CompareId) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return addIdToStorage<CompareId>('compareIds', newIdEntitity, findFunc);
}

export function deleteFromCompare(
  categoryId: string,
  subcategoryId: string,
  productId: string,
): Promise<Response> {
  const findFunction = ([cId, subcId, pId]: CompareId) => (cId === categoryId
    && subcId === subcategoryId && pId === productId);

  return deleteIdFromStorage<CompareId>('compareIds', findFunction);
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

export async function getRandomProduct(): Promise<ProductWithIds> {
  await fakeNetwork();

  const { categoryId, subcategory } = getCategoryAndSubcategory('enamels', 'alkyd_enamels');
  const subcategoryProducts: Product[] = Object.values(subcategory.products.entities);

  const randomProduct = (subcategoryProducts.sort(() => 0.5 - Math.random()))[0];

  return {
    categoryId,
    subcategoryId: subcategory.id,
    product: randomProduct,
  };
}

// search API

interface CategoryForSearch {
  id: string,
  name: string,
}

interface SubcategoryForSearch {
  categoryId: string,
  id: string,
  name: string,
}

interface ProductForSearch {
  categoryId: string,
  subcategoryId: string,
  product: Product,
}

interface NewsForSearch {
  id: string,
  name: string,
}

interface FoundCategory {
  type: 'category',
  category: CategoryForSearch,
}

interface FoundSubcategory {
  type: 'subcategory',
  subcategory: SubcategoryForSearch,
}

interface FoundProduct {
  type: 'product',
  product: ProductForSearch,
}

interface FoundNews {
  type: 'news',
  news: NewsForSearch,
}

export type FoundEntities = (
  FoundCategory | FoundSubcategory | FoundProduct | FoundNews)[]

function getAllSearchResults(searchQuery: string): FoundEntities {
  const firstOrderRegExp = new RegExp(`^${searchQuery}`, 'i');
  const lastOrderRegExp = new RegExp(`${searchQuery}`, 'i');

  const allCategories: CategoryForSearch[] = [];
  const allSubcategories: SubcategoryForSearch[] = [];
  const allProducts: ProductForSearch[] = [];
  const allNews: NewsForSearch[] = [];
  const firstOrderResults: FoundEntities = [];
  const lastOrderResults: FoundEntities = [];

  Object.values(products.categories.entities).forEach((c) => {
    allCategories.push({
      id: c.id,
      name: c.name,
    });

    Object.values(c.subcategories.entities).forEach((s) => {
      allSubcategories.push({
        categoryId: c.id,
        id: s.id,
        name: s.name,
      });

      Object.values(s.products.entities).forEach((p) => allProducts.push({
        categoryId: c.id,
        subcategoryId: s.id,
        product: p,
      }));
    });
  });

  Object.values(news.entities).forEach((n) => {
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

  const result: FoundEntities = [...firstOrderResults, ...lastOrderResults];

  return result;
}

export interface SearchResults {
  searchResults: FoundEntities,
  pageAmount: number,
}

export async function getSearchResultsPerPageAndPageAmount(
  searchQuery: string,
  pageNum: number,
): Promise<SearchResults> {
  await fakeNetwork();

  const perView = 12;
  const allSearchResults = getAllSearchResults(searchQuery);
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

// news API

function getAllNewsPreviews(): NewsArticleShort[] {
  const newsFullObjs: NewsArticle[] = Object.values(news.entities);
  const newsShortObjs: NewsArticleShort[] = newsFullObjs.map((n) => ({
    name: n.name,
    id: n.id,
    date: n.date,
    views: n.views,
  }));

  return newsShortObjs;
}

export interface NewsArticlesWithAmount {
  pageAmount: number,
  previews: NewsArticleShort[],
}

export async function getNewsPreviewsPerPageAndPageAmount(
  pageNum: number,
): Promise<NewsArticlesWithAmount> {
  await fakeNetwork();

  const allNewsPreviews = getAllNewsPreviews();
  const allNewsPreviewsAmount = allNewsPreviews.length;
  const perView = 12;

  const pageAmount = getPageAmount(allNewsPreviewsAmount, perView);

  if (pageNum === null || pageNum > pageAmount) pageNum = 1;

  const firstPageNewsPreview = (+pageNum - 1) * +perView;
  const lastPageNewsPreview = +pageNum * +perView;

  const newsPreviewsPerPage = allNewsPreviews.slice(firstPageNewsPreview, lastPageNewsPreview);

  return {
    pageAmount,
    previews: newsPreviewsPerPage,
  };
}

export async function getNewsArticle(articleId) {
  await fakeNetwork();

  const article = news.entities[articleId];

  if (!article) throw new Response(null, { status: 404, statusText: 'Not found' });

  return new Response(JSON.stringify(article), { status: 200, statusText: 'OK' });
}

export async function getRecommendedNews(id) {
  await fakeNetwork();

  let allNewsPreviews = getAllNewsPreviews();
  allNewsPreviews = allNewsPreviews.filter((n) => n.id !== id);

  const recommendedNews = (allNewsPreviews.sort(() => 0.5 - Math.random())).slice(0, 3);

  return recommendedNews;
}
