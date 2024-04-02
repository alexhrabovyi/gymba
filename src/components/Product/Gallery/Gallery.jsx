/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useRef, Suspense, useMemo,
} from 'react';
import { Await } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import Slider from '../../common/Slider/Slider.jsx';
import BigPrevNextButton from '../../common/BigPrevNextButton/BigPrevNextButton.jsx';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import backdropCls from '../../../scss/_backdrop.module.scss';
import galleryCls from './Gallery.module.scss';

const Gallery = memo(({
  imgIds, isOpen = false, setIsOpen, activeSlideId, setActiveSlideId, productName,
}) => {
  const backdropRef = useRef(null);
  const sliderBlockRef = useRef(null);

  useHideScrollbarOnOpen(isOpen);
  useToggleInteractiveElements(sliderBlockRef, isOpen);

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

  return (
    <div
      ref={backdropRef}
      className={classNames(
        backdropCls.backdrop,
        galleryCls.backdrop,
        isOpen && backdropCls.backdrop_active,
      )}
      onClick={backdropOnClick}
    >
      <aside
        ref={sliderBlockRef}
        className={galleryCls.sliderBlock}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal
        aria-label={`Галерея зображень ${productName}`}
        tabIndex={isOpen ? '0' : '-1'}
      >
        <Slider
          slides={slides}
          gap={20}
          activeSlideId={activeSlideId}
          setActiveSlideId={setActiveSlideId}
        />
        <BigPrevNextButton
          className={classNames(
            galleryCls.sliderBtn,
            galleryCls.prevBtn,
          )}
          isInactive={activeSlideId === 0}
          isPrev
          onClick={() => setActiveSlideId((id) => id - 1)}
        />
        <BigPrevNextButton
          className={classNames(
            galleryCls.sliderBtn,
            galleryCls.nextBtn,
          )}
          isInactive={activeSlideId === slides.length - 1}
          onClick={() => setActiveSlideId((id) => id + 1)}
        />
      </aside>
    </div>
  );
});

export default Gallery;
