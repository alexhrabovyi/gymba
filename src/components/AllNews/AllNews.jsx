import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import NewsPreview from '../common/NewsPreview/NewsPreview.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './AllNews.module.scss';

export default function AllNews() {
  const { pageAmount, newsPreviews } = useLoaderData();

  const newsPreviewsElements = useMemo(() => (
    newsPreviews.map((n) => (
      <NewsPreview
        key={n.id}
        name={n.name}
        id={n.id}
        date={n.date}
        views={n.views}
      />
    ))
  ), [newsPreviews]);

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
      <div className={newsCls.newsPreviews}>
        {newsPreviewsElements}
      </div>
      {pageAmount > 0 && (
        <div className={newsCls.paginationBlock}>
          <PaginationBlock pageAmount={pageAmount} />
        </div>
      )}
    </main>
  );
}
