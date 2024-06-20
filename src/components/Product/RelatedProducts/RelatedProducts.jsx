import {
  memo, useMemo, useState, useCallback, useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import { useGetAnalogueProductsQuery } from '../../../queryAPI/queryAPI';
import useOnResize from '../../../hooks/useOnResize';
import ProductCard from '../../ProductCard/ProductCard';
import Slider from '../../common/Slider/Slider';
import BigPrevNextButton from '../../common/BigPrevNextButton/BigPrevNextButton';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import textCls from '../../../scss/_text.module.scss';
import relatedProductsCls from './RelatedProducts.module.scss';

const RelatedProducts = memo(({ categoryId, subcategoryId, productId }) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [products, setProducts] = useState();
  const [activeSlideId, setActiveSlideId] = useState(0);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const fetchUrl = `${categoryId}/${subcategoryId}/${productId}`;

  const { data: fetchedProducts } = useGetAnalogueProductsQuery(fetchUrl);

  if (fetchedProducts) {
    if (products !== fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }

  const productSlides = useMemo(() => {
    if (!products) return [];

    return products.map((p) => (
      <div
        key={p.id}
        className={relatedProductsCls.slide}
      >
        <ProductCard
          key={p.id}
          name={p.name}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          productId={p.id}
          price={p.price}
          oldPrice={p.oldPrice}
          isShortCard
        />
      </div>
    ));
  }, [products, categoryId, subcategoryId]);

  let perView = 4;

  if (windowWidth <= 1100) perView = 3;
  if (windowWidth <= 768) perView = 2;
  if (windowWidth <= 430) perView = 1;

  if (productSlides.length !== 0 && activeSlideId > productSlides.length - perView) {
    setActiveSlideId(productSlides.length - perView);
  }

  return (
    <article className={relatedProductsCls.article}>
      <p className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text38px,
        textCls.textBlack,
        relatedProductsCls.title,
      )}
      >
        Аналоги
      </p>
      <div className={relatedProductsCls.sliderBlock}>
        {products ? (
          <>
            <Slider
              activeSlideId={activeSlideId}
              setActiveSlideId={setActiveSlideId}
              slides={productSlides}
              gap="0"
              perView={perView}
            />
            <BigPrevNextButton
              className={relatedProductsCls.prevBtn}
              isInactive={activeSlideId === 0}
              isPrev
              onClick={() => setActiveSlideId((id) => id - 1)}
            />
            <BigPrevNextButton
              className={relatedProductsCls.nextBtn}
              isInactive={activeSlideId === (productSlides.length - perView || 0)}
              onClick={() => setActiveSlideId((id) => id + 1)}
            />
          </>
        ) : (
          <ThreeDotsSpinnerBlock />
        )}
      </div>
    </article>
  );
});

export default RelatedProducts;
