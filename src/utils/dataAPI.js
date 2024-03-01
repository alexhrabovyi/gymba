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
    name: category.name,
    id: category.id,
    subcategories,
  };
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
