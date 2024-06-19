import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetCategoriesQuery } from '../../queryAPI/queryAPI';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import categoryCls from './Category.module.scss';
import Subcategory from './Subcategory/Subcategory.jsx';

export default function Category() {
  const categoryIdFromParams = useParams().categoryId;

  const [category, setCategory] = useState(null);

  const { data, status } = useGetCategoriesQuery();

  if (status === 'fulfilled') {
    const fetchedCategory = data.entities[categoryIdFromParams];

    if (!fetchedCategory) {
      throw new Response(null, { status: 404 });
    } else if (fetchedCategory !== category) {
      setCategory(fetchedCategory);
    }
  }

  const categoryName = category?.name;
  const categoryId = category?.id;
  const subcategories = category && Object.values(category.subcategories.entities);

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
