import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import categoryCls from './Category.module.scss';
import Subcategory from './Subcategory/Subcategory.jsx';

export default function Category() {
  const category = useLoaderData();
  const { categoryName, categoryId, subcategories } = category;

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
        {subcategories.map((s) => (
          <Subcategory
            key={s.id}
            categoryId={categoryId}
            name={s.name}
            id={s.id}
            imgId={s.imgId}
            imgAlt={s.imgAlt}
          />
        ))}
      </div>
    </main>
  );
}
