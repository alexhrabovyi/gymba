import { Suspense } from 'react';
import MainSlider from '../../components/MainSlider/MainSlider.jsx';
import CatalogLazy from '../../components/Catalog/Catalog.lazy.jsx';
import NewsPreviewsLazy from '../../components/NewsPreviews/NewsPreviews.lazy.jsx';

export default function Main() {
  return (
    <>
      <MainSlider />
      <Suspense>
        <CatalogLazy />
      </Suspense>
      <Suspense>
        <NewsPreviewsLazy />
      </Suspense>
    </>
  );
}
