import {
  useCallback, useLayoutEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { useGetNewsQuery } from '../../queryAPI/queryAPI.js';
import useOnResize from '../../hooks/useOnResize.jsx';
import Slider from '../common/Slider/Slider.jsx';
import LinkWithArrow from '../common/LinkWithArrow/LinkWithArrow.jsx';
import NewsPreview from '../common/NewsPreview/NewsPreview.jsx';
import BigPrevNextButton from '../common/BigPrevNextButton/BigPrevNextButton.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './NewsPreviews.module.scss';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';

export default function NewsPreviews() {
  const [news, setNews] = useState(null);
  const [windowWidth, setWindowWidth] = useState();
  const [activeSlideId, setActiveSlideId] = useState(0);

  const { data } = useGetNewsQuery();

  if (data && news === null) {
    setNews(Object.values(data.entities));
  }

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  const previews = useMemo(() => news?.map((n) => (
    <NewsPreview
      key={n.id}
      name={n.name}
      id={n.id}
      date={n.date}
      views={n.views}
    />
  )), [news]);

  let perView = 3;

  if (windowWidth <= 1024) perView = 2;
  if (windowWidth <= 768) perView = 1;

  if (previews && activeSlideId > previews.length - perView) {
    setActiveSlideId(previews.length - perView);
  }

  const isPrevButtonInactive = activeSlideId === 0;
  const isNextButtonInactive = previews && activeSlideId === previews.length - perView;

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
        Новини
      </h2>
      <div className={newsCls.previews}>
        {!previews && (
          <ThreeDotsSpinnerBlock
            blockClassName={newsCls.spinnerBlock}
          />
        )}
        {previews && windowWidth > 1360 && previews}
        {previews && windowWidth <= 1360 && (
          <Slider
            activeSlideId={activeSlideId}
            setActiveSlideId={setActiveSlideId}
            slides={previews}
            gap="5"
            perView={perView}
          />
        )}
        {previews && windowWidth <= 1360 && (
          <>
            <BigPrevNextButton
              className={newsCls.sliderButtonPrev}
              isInactive={isPrevButtonInactive}
              isPrev
              onClick={() => setActiveSlideId((id) => id - 1)}
            />
            <BigPrevNextButton
              className={newsCls.sliderButtonNext}
              isInactive={isNextButtonInactive}
              onClick={() => setActiveSlideId((id) => id + 1)}
            />
          </>
        )}
      </div>
      <LinkWithArrow
        to="news"
        alt="Всі новини"
        className={newsCls.linkWithArrow}
      >
        Всі новини
      </LinkWithArrow>
    </article>
  );
}
