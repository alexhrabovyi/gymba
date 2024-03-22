/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useRef, Suspense, useMemo, useState,
} from 'react';
import { Await } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import Slider from '../../common/Slider/Slider.jsx';
import BigPrevNextButton from '../../common/BigPrevNextButton/BigPrevNextButton.jsx';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import galleryCls from './Gallery.module.scss';

const Gallery = memo(({
  imgIds, isOpen = false, setIsOpen, activeSlideId, productName,
}) => {
  const backdropRef = useRef(null);
  const sliderBlockRef = useRef(null);

  useHideScrollbarOnOpen(isOpen);
  useToggleInteractiveElements(sliderBlockRef, isOpen);

  const [isBtnPrevInactive, setIsBtnPrevInactive] = useState(false);
  const [isBtnNextInactive, setIsBtnNextInactive] = useState(false);

  function backdropOnClick(e) {
    if (e.target === backdropRef.current) setIsOpen(false);
  }

  const imgSrcs = useMemo(() => imgIds.map((imgId) => import(`../../../assets/images/productImgs/${imgId}.webp`)), [imgIds]);

  const slides = imgSrcs.map((src, i) => (
    <div
      key={i}
      className={galleryCls.slide}
    >
      <Suspense
        fallback={<Spinner className={galleryCls.spinner} />}
      >
        <Await resolve={src}>
          <DynamicImage
            className={galleryCls.slideImg}
            alt={productName}
          />
        </Await>
      </Suspense>
    </div>
  ));

  const prevBtnId = 'gallerySliderBtnPrev';
  const nextBtnId = 'gallerySliderBtnNext';

  const btnPrevDetails = useMemo(() => ({
    id: prevBtnId,
    toggleInactive: setIsBtnPrevInactive,
  }), []);

  const btnNextDetails = useMemo(() => ({
    id: nextBtnId,
    toggleInactive: setIsBtnNextInactive,
  }), []);

  return (
    <div
      ref={backdropRef}
      className={classNames(
        galleryCls.backdrop,
        isOpen && galleryCls.backdrop_active,
      )}
      onClick={backdropOnClick}
    >
      <aside
        ref={sliderBlockRef}
        className={galleryCls.sliderBlock}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal
        aria-label={`Галерея изображений ${productName}`}
        tabIndex={isOpen ? '0' : '-1'}
      >
        <Slider
          key={activeSlideId}
          slides={slides}
          gap={20}
          initActiveSlideId={activeSlideId}
          btnPrevDetails={btnPrevDetails}
          btnNextDetails={btnNextDetails}
        />
        <BigPrevNextButton
          className={classNames(
            galleryCls.sliderBtn,
            galleryCls.prevBtn,
          )}
          isInactive={isBtnPrevInactive}
          isPrev
          id={prevBtnId}
        />
        <BigPrevNextButton
          className={classNames(
            galleryCls.sliderBtn,
            galleryCls.nextBtn,
          )}
          isInactive={isBtnNextInactive}
          id={nextBtnId}
        />
      </aside>
    </div>
  );
});

export default Gallery;
