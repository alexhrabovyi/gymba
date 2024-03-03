import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import FilterBlock from './FilterBlock/FilterBlock.jsx';

export default function Products() {
  const { subcategory } = useLoaderData();

  return (
    <main className={classNames(containerCls.container, productsCls.main)}>
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        productsCls.title,
      )}
      >
        {subcategory.name}
      </h1>
      <div className={productsCls.filtersAndProducts}>
        <FilterBlock />
      </div>
    </main>
  );
}
