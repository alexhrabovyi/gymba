import {
  useCallback, useLayoutEffect, useMemo, useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import useOnResize from '../../hooks/useOnResize.jsx';
import Slider from '../common/Slider/Slider.jsx';
import LinkWithArrow from '../common/LinkWithArrow/LinkWithArrow.jsx';
import NewsPreview from './NewsPreview/NewsPreview.jsx';
import BigPrevNextButton from '../common/BigPrevNextButton/BigPrevNextButton.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './NewsPreviews.module.scss';

export default function NewsPreviews() {
  const { news } = useLoaderData();
  const [windowWidth, setWindowWidth] = useState();
  const [activeSlideId, setActiveSlideId] = useState(0);

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

  let perView = 3;

  if (windowWidth <= 1024) perView = 2;
  if (windowWidth <= 768) perView = 1;

  if (activeSlideId > previews.length - perView) {
    setActiveSlideId(previews.length - perView);
  }

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
        {windowWidth <= 1360 && (
          <Slider
            activeSlideId={activeSlideId}
            setActiveSlideId={setActiveSlideId}
            slides={previews}
            gap="5"
            perView={perView}
          />
        )}
        {windowWidth <= 1360 && (
          <>
            <BigPrevNextButton
              className={newsCls.sliderButtonPrev}
              isInactive={activeSlideId === 0}
              isPrev
              onClick={() => setActiveSlideId((id) => id - 1)}
            />
            <BigPrevNextButton
              className={newsCls.sliderButtonNext}
              isInactive={activeSlideId === previews.length - perView}
              onClick={() => setActiveSlideId((id) => id + 1)}
            />
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
