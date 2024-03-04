import { useLoaderData, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import FilterBlock from './FilterBlock/FilterBlock.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';
import Line from './images/line.svg';
import Button from '../common/Button/Button.jsx';

export default function Products() {
  const { subcategory, filteredProducts } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const productCards = filteredProducts.map((p) => (
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
          {productCards.length ? productCards : (
            <div className={productsCls.noProductsBlock}>
              <div className={productsCls.noProductsContent}>
                <Line className={productsCls.noProductsLine} />
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text48px,
                  productsCls.noProductsText,
                )}
                >
                  Товары не найдены
                </p>
                <Button
                  className={productsCls.resetButton}
                  onClick={() => setSearchParams()}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
