import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetNewsQuery } from '../../queryAPI/queryAPI';
import NewsPreview from '../common/NewsPreview/NewsPreview';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './AllNews.module.scss';

export default function AllNews() {
  const [searchParams] = useSearchParams();

  const [newsPreviewsObjs, setNewsPreviewsObjs] = useState(null);
  const [pageAmount, setPageAmount] = useState(null);

  const currentPageNum = searchParams.get('page') || 1;

  const { data: fetchedData, isLoading, isFetching } = useGetNewsQuery(currentPageNum);

  if (fetchedData) {
    if (newsPreviewsObjs !== fetchedData.previews) {
      setNewsPreviewsObjs(fetchedData.previews);
    }

    if (pageAmount !== fetchedData.pageAmount) {
      setPageAmount(fetchedData.pageAmount);
    }
  }

  const newsPreviewsElements = useMemo(() => {
    if (!newsPreviewsObjs) return;

    return newsPreviewsObjs.map((n) => (
      <NewsPreview
        key={n.id}
        name={n.name}
        id={n.id}
        date={n.date}
        views={n.views}
      />
    ));
  }, [newsPreviewsObjs]);

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
        <div className={classNames(
          newsCls.newsPreviews,
          !isLoading && isFetching && newsCls.newsPreviews_inactive,
        )}
        >
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
