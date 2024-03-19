import {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import ProductCard from '../../ProductCard/ProductCard.jsx';
import Slider from '../../common/Slider/Slider.jsx';
import BigPrevNextButton from '../../common/BigPrevNextButton/BigPrevNextButton.jsx';
import textCls from '../../../scss/_text.module.scss';
import relatedProductsCls from './RelatedProducts.module.scss';

const RelatedProducts = memo(({ categoryId, subcategoryId, productId }) => {
  const fetcher = useFetcher();

  const [products, setProducts] = useState();
  const [isBtnPrevInactive, setIsBtnPrevInactive] = useState(true);
  const [isBtnNextInactive, setIsBtnNextInactive] = useState(false);

  useEffect(() => {
    if (fetcher.state === 'idle' && !products) {
      const data = JSON.stringify([categoryId, subcategoryId, productId]);

      fetcher.submit(data, {
        action: '../getAnalogueProducts',
        method: 'POST',
        encType: 'application/json',
      });
    }
  }, [fetcher, categoryId, subcategoryId, productId, products]);

  useEffect(() => {
    if (fetcher.data && fetcher.data !== products) setProducts(fetcher.data);
  }, [fetcher, products]);

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

  const prevBtnId = 'relatedSliderBtnPrev';
  const nextBtnId = 'relatedSliderBtnNext';

  const btnPrevDetails = useMemo(() => ({
    id: prevBtnId,
    toggleInactive: setIsBtnPrevInactive,
  }), []);

  const btnNextDetails = useMemo(() => ({
    id: nextBtnId,
    toggleInactive: setIsBtnNextInactive,
  }), []);

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
        <Slider
          slides={productSlides}
          gap="0"
          perView={4}
          btnPrevDetails={btnPrevDetails}
          btnNextDetails={btnNextDetails}
        />
        <BigPrevNextButton
          className={relatedProductsCls.prevBtn}
          isInactive={isBtnPrevInactive}
          isPrev
          id={prevBtnId}
        />
        <BigPrevNextButton
          className={relatedProductsCls.nextBtn}
          isInactive={isBtnNextInactive}
          id={nextBtnId}
        />
      </div>
    </article>
  );
});

export default RelatedProducts;
