import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import FilterBlock from './FilterBlock/FilterBlock.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';

export default function Products() {
  const { subcategory } = useLoaderData();
  const { products } = subcategory;

  console.log(products);

  const productCards = products.map((p) => (
    <ProductCard
      key={p.id}
      name={p.name}
      id={p.id}
      price={p.price}
      oldPrice={p.oldPrice}
    />
  ));

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
        <div className={productsCls.products}>
          {productCards}
        </div>
      </div>
    </main>
  );
}
