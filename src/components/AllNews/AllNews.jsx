import { useState, useMemo } from 'react';
import { useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import NewsPreview from '../common/NewsPreview/NewsPreview.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './AllNews.module.scss';
import useFetcherLoad from '../../hooks/useFetcherLoad.jsx';

export default function AllNews() {
  const newsFetcher = useFetcher();

  const [newsFetcherData, setNewsFetcherData] = useState(null);

  const newsPreviews = newsFetcherData?.newsPreviews;
  const pageAmount = newsFetcherData?.pageAmount;

  useFetcherLoad(newsFetcher, '/news');

  if (newsFetcher.data) {
    if (newsFetcher.data.newsPreviewsPerPageAndPageAmount !== newsFetcherData) {
      setNewsFetcherData(newsFetcher.data.newsPreviewsPerPageAndPageAmount);
    }
  }

  const newsPreviewsElements = useMemo(() => {
    if (!newsPreviews) return;

    return newsPreviews.map((n) => (
      <NewsPreview
        key={n.id}
        name={n.name}
        id={n.id}
        date={n.date}
        views={n.views}
      />
    ));
  }, [newsPreviews]);

  return (
    <main className={classNames(
      containerCls.container,
      newsCls.main,
    )}
    >
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        newsCls.title,
      )}
      >
        Новини
      </h1>
      {newsPreviewsElements ? (
        <div className={newsCls.newsPreviews}>
          {newsPreviewsElements}
        </div>
      ) : (
        <ThreeDotsSpinnerBlock />
      )}
      {pageAmount && pageAmount > 0 && (
        <div className={newsCls.paginationBlock}>
          <PaginationBlock pageAmount={pageAmount} />
        </div>
      )}
    </main>
  );
}
