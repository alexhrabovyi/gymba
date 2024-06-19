import { Suspense } from 'react';
import MainSlider from '../../components/MainSlider/MainSlider';
import CatalogLazy from '../../components/Catalog/Catalog.lazy';
import NewsPreviewsLazy from '../../components/NewsPreviews/NewsPreviews.lazy';

const Main: React.FC = () => (
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

export default Main;
