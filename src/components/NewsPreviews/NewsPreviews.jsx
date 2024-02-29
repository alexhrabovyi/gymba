import {
  useCallback, useLayoutEffect, useMemo, useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import useOnResize from '../../hooks/useOnResize.jsx';
import Slider from '../common/Slider/Slider.jsx';
import LinkWithArrow from '../common/LinkWithArrow/LinkWithArrow.jsx';
import NewsPreview from './NewsPreview/NewsPreview.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './NewsPreviews.module.scss';
import ChevronRight from './images/chevronRight.svg';

export default function NewsPreviews() {
  const { news } = useLoaderData();
  const [windowWidth, setWindowWidth] = useState();
  const [isPrevBtnInactive, setIsPrevBtnInactive] = useState(true);
  const [isNextBtnInactive, setIsNextBtnInactive] = useState(false);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  const previews = useMemo(() => news.map((n) => (
    <NewsPreview
      key={n.id}
      name={n.name}
      id={n.id}
      date={n.date}
      views={n.views}
      previewImgId={n.previewImgId}
    />
  )), [news]);

  const btnPrevId = 'newsSliderBtnPrev';
  const btnNextId = 'newsSliderBtnNext';

  const btnPrevDetails = useMemo(() => ({
    id: btnPrevId,
    toggleInactive: setIsPrevBtnInactive,
  }), []);

  const btnNextDetails = useMemo(() => ({
    id: btnNextId,
    toggleInactive: setIsNextBtnInactive,
  }), []);

  return (
    <article className={classNames(containerCls.container, newsCls.article)}>
      <h2 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        newsCls.title,
      )}
      >
        Новости
      </h2>
      <div className={newsCls.previews}>
        {windowWidth > 1360 && previews}
        {windowWidth <= 1360 && windowWidth > 1024 && (
          <Slider
            slides={previews}
            gap="5"
            perView="3"
            btnPrevDetails={btnPrevDetails}
            btnNextDetails={btnNextDetails}
          />
        )}
        {windowWidth <= 1024 && windowWidth > 768 && (
          <Slider
            slides={previews}
            gap="5"
            perView="2"
            btnPrevDetails={btnPrevDetails}
            btnNextDetails={btnNextDetails}
          />
        )}
        {windowWidth <= 768 && (
          <Slider
            slides={previews}
            gap="5"
            perView="1"
            btnPrevDetails={btnPrevDetails}
            btnNextDetails={btnNextDetails}
          />
        )}
        {windowWidth <= 1360 && (
          <>
            <button
              id={btnPrevId}
              type="button"
              className={
                classNames(
                  newsCls.sliderButton,
                  newsCls.sliderButton_prev,
                  isPrevBtnInactive && newsCls.sliderButton_disabled,
                )
              }
              aria-hidden
              disabled={isPrevBtnInactive}
            >
              <ChevronRight
                className={newsCls.chevronIcon}
              />
            </button>
            <button
              id={btnNextId}
              type="button"
              className={
                classNames(
                  newsCls.sliderButton,
                  newsCls.sliderButton_next,
                  isNextBtnInactive && newsCls.sliderButton_disabled,
                )
              }
              aria-hidden
              disabled={isNextBtnInactive}
            >
              <ChevronRight
                className={newsCls.chevronIcon}
              />
            </button>
          </>
        )}
      </div>
      <LinkWithArrow
        to="news"
        alt="Все новости"
        className={newsCls.linkWithArrow}
      >
        Все новости
      </LinkWithArrow>
    </article>
  );
}
