/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
import {
  useState, Suspense, useCallback, useMemo,
} from 'react';
import { Await, Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetNewsArticleQuery, useGetRecommendedNewsQuery } from '../../queryAPI/queryAPI.js';
import Spinner from '../common/Spinner/Spinner.jsx';
import DynamicImage from '../common/DynamicImage/DynamicImage.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import linkCls from '../../scss/_link.module.scss';
import articleCls from './NewsArticle.module.scss';
import LineIcon from '../../assets/images/icons/oblique.svg';
import ViewsIcon from '../../assets/images/icons/views.svg';

export default function NewsArticle() {
  const params = useParams();

  const [articleObj, setArticleObj] = useState(null);
  const [recommendedNewsObjs, setRecommendedNewsObjs] = useState(null);

  const { articleId } = params;

  const {
    data: fetchedArticleObj,
    status,
    isLoading: isArticleLoading,
    isFetching: isArticleFetching,
  } = useGetNewsArticleQuery(articleId);

  if (fetchedArticleObj) {
    if (fetchedArticleObj !== articleObj) {
      setArticleObj(fetchedArticleObj);
    }
  }

  if (status === 'rejected') {
    throw new Response(null, { status: 404, statusText: 'Not found' });
  }

  const { data: fetchedRecommendedNews } = useGetRecommendedNewsQuery(articleId);

  if (fetchedRecommendedNews) {
    if (recommendedNewsObjs !== fetchedRecommendedNews) {
      setRecommendedNewsObjs(fetchedRecommendedNews);
    }
  }

  const createContentTitle = useCallback((titleType, title) => {
    switch (titleType) {
      case 'h1': {
        return (
          <h1 className={articleCls.h1}>{title}</h1>
        );
      }
      case 'h2': {
        return (
          <h2 className={articleCls.h2}>{title}</h2>
        );
      }
      case 'h3': {
        return (
          <h3 className={articleCls.h3}>{title}</h3>
        );
      }
      case 'h4': {
        return (
          <h4 className={articleCls.h4}>{title}</h4>
        );
      }
      case 'h5': {
        return (
          <h5 className={articleCls.h5}>{title}</h5>
        );
      }
      case 'h6': {
        return (
          <h6 className={articleCls.h6}>{title}</h6>
        );
      }
    }
  }, []);

  const createContentImg = useCallback((imgId, imgAlt) => {
    const imgSrc = import(`../../assets/images/newsImgs/additional-${imgId}-${articleObj.id}.webp`);

    return (
      <div
        key={imgId}
        className={articleCls.contentImgBlock}
      >
        <Suspense
          key={imgId}
          fallback={<Spinner className={articleCls.spinner} />}
        >
          <Await resolve={imgSrc}>
            <DynamicImage
              className={articleCls.contentBlockImg}
              alt={imgAlt}
            />
          </Await>
        </Suspense>
      </div>
    );
  }, [articleObj]);

  const createContentList = useCallback((key, listElems) => {
    const listElements = listElems.map((e, i) => (
      <li
        key={i}
        className={articleCls.contentBlockListElement}
      >
        <LineIcon className={articleCls.listLineIcon} />
        <p className={articleCls.text}>
          {e}
        </p>
      </li>
    ));

    return (
      <ul
        key={key}
        className={articleCls.contentBlockList}
      >
        {listElements}
      </ul>
    );
  }, []);

  const createContentParagraphs = useCallback((paragraphs) => (
    paragraphs.map((p, i) => (
      <p
        key={i}
        className={articleCls.text}
      >
        {p}
      </p>
    ))
  ), []);

  const createContentQuoteBlock = useCallback((key, quotes) => {
    const quoteTextParagraphs = quotes.map((e, i) => (
      <blockquote
        key={i}
        className={articleCls.quoteText}
      >
        {e}
      </blockquote>
    ));

    return (
      <div
        key={key}
        className={articleCls.quoteBlock}
      >
        <LineIcon className={articleCls.quoteBlockLineIcon} />
        {quoteTextParagraphs}
      </div>
    );
  }, []);

  const createContentTable = useCallback((key, columnHeaders, rows) => {
    let columnHeadersRow;

    if (columnHeaders) {
      const headerCells = columnHeaders.map((c, i) => (
        <th
          key={i}
          className={articleCls.columnHeader}
        >
          {c}
        </th>
      ));

      columnHeadersRow = (
        <tr className={articleCls.columnHeaderRow}>
          {headerCells}
        </tr>
      );
    }

    let tableRows;

    if (rows) {
      tableRows = rows.map((r, i) => {
        const cells = r.map((c, i) => (
          <td
            key={i}
            className={articleCls.tableCell}
          >
            {c}
          </td>
        ));

        return (
          <tr
            key={i}
            className={articleCls.tableRow}
          >
            {cells}
          </tr>
        );
      });
    }

    return (
      <table
        key={key}
        className={articleCls.table}
      >
        <tbody className={articleCls.tbody}>
          {columnHeadersRow}
          {tableRows}
        </tbody>
      </table>
    );
  }, []);

  const contentBlocks = useMemo(() => {
    if (!articleObj) return;

    return articleObj.description.map((d, i) => {
      let title;

      if (d.titleType) {
        title = createContentTitle(d.titleType, d.title);
      }

      const content = d.content.map((c, i) => {
        switch (c.contentType) {
          case 'img': {
            return createContentImg(c.imgId, c.imgAlt);
          }
          case 'list': {
            return createContentList(i, c.elements);
          }
          case 'paragraph': {
            return createContentParagraphs(c.elements);
          }
          case 'quote': {
            return createContentQuoteBlock(i, c.elements);
          }
          case 'table': {
            return createContentTable(i, c.columnHeaders, c.rows);
          }
        }
      });

      return (
        <div
          key={i}
          className={articleCls.contentBlock}
        >
          {title}
          <div className={articleCls.contentBlockElements}>
            {content}
          </div>
        </div>
      );
    });
  }, [articleObj, createContentTitle, createContentImg, createContentList,
    createContentParagraphs, createContentQuoteBlock, createContentTable]);

  const recommendedNewsList = useMemo(() => {
    if (!recommendedNewsObjs) return;

    const recommendedNewsListElements = recommendedNewsObjs.map((rN) => (
      <li
        key={rN.id}
        className={articleCls.recommendedNewsListElement}
      >
        <div className={articleCls.reccomendedNewsDateAndViewsBlock}>
          {rN.date}
          <div className={articleCls.reccomendedNewsViewsBlock}>
            <ViewsIcon className={articleCls.reccomendedNewsViewsIcon} />
            {rN.views}
          </div>
        </div>
        <Link
          className={linkCls.link}
          to={`/news/${rN.id}`}
          alt={rN.name}
        >
          {rN.name}
        </Link>
      </li>
    ));

    return (
      <ul className={articleCls.recommendedNewsList}>
        {recommendedNewsListElements}
      </ul>
    );
  }, [recommendedNewsObjs]);

  return (
    <main className={classNames(
      containerCls.container,
      articleCls.main,
      !isArticleLoading && isArticleFetching && articleCls.main_inactive,
    )}
    >
      <h1 className={articleCls.h1}>
        {articleObj?.name}
      </h1>
      {articleObj ? (
        <>
          <div className={articleCls.articleAndRecommendArticleBlock}>
            <div className={articleCls.article}>
              {contentBlocks}
            </div>
            <article className={articleCls.recommendArticlesBlock}>
              <p className={articleCls.recommendArticlesTitle}>
                Дивіться також
              </p>
              {recommendedNewsList || <ThreeDotsSpinnerBlock />}
            </article>
          </div>
          <div className={articleCls.dateAndViewsBlock}>
            {articleObj.date}
            <div className={articleCls.viewsBlock}>
              <ViewsIcon
                className={articleCls.viewsIcon}
              />
              {articleObj.views}
            </div>
          </div>
        </>
      ) : (
        <ThreeDotsSpinnerBlock />
      )}
    </main>
  );
}
