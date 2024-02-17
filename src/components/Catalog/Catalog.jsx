/* eslint-disable no-plusplus */
import classNames from 'classnames';
import { useLoaderData } from 'react-router-dom';
import catalogCls from './Catalog.module.scss';
import textCls from '../../scss/_text.module.scss';
import containerCls from '../../scss/_container.module.scss';
import Category from './CatalogCategory/CatalogCategory.jsx';

export default function Catalog() {
  const categories = useLoaderData();
  let figureId = 1;

  return (
    <main className={classNames(catalogCls.catalog, containerCls.container)}>
      <h1
        className={classNames(
          catalogCls.title,
          textCls.text,
          textCls.textFw800,
          textCls.text48px,
          textCls.textBlack,
        )}
      >
        Каталог
      </h1>
      <div className={catalogCls.categoryBlock}>
        {categories.map((categoryProps) => {
          if (figureId > 9) figureId = 1;

          return (
            <Category
              key={categoryProps.id}
              categoryProps={categoryProps}
              figureId={figureId++}
            />
          );
        })}
      </div>
    </main>
  );
}
