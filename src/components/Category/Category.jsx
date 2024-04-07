import { useMemo, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import classNames from 'classnames';
import useFetcherLoad from '../../hooks/useFetcherLoad.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import categoryCls from './Category.module.scss';
import Subcategory from './Subcategory/Subcategory.jsx';

export default function Category() {
  const categoryFetcher = useFetcher();
  const categoryIdFromParams = useParams().categoryId;

  const [category, setCategory] = useState(null);

  useFetcherLoad(categoryFetcher, `/${categoryIdFromParams}`);

  if (categoryFetcher.data) {
    const categoryFromFetcher = categoryFetcher.data.category;

    if (categoryFromFetcher !== category) {
      setCategory(categoryFromFetcher);
    }
  }

  const categoryName = category?.categoryName;
  const categoryId = category?.categoryId;
  const subcategories = category?.subcategories;

  const subcategoryElements = useMemo(() => (
    subcategories?.map((s) => (
      <Subcategory
        key={s.id}
        categoryId={categoryId}
        name={s.name}
        id={s.id}
        imgId={s.id}
        imgAlt={s.imgAlt}
      />
    ))
  ), [subcategories, categoryId]);

  return (
    <main className={classNames(containerCls.container, categoryCls.main)}>
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        categoryCls.title,
      )}
      >
        {categoryName}
      </h1>
      <div className={categoryCls.subcategories}>
        {subcategoryElements
          || <ThreeDotsSpinnerBlock blockClassName={categoryCls.spinnerBlock} />}
      </div>
    </main>
  );
}
