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
