import { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import SortBlock from './SortBlock/SortBlock.jsx';
import FilterBlock from './FilterBlock/FilterBlock.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';
import Line from './images/line.svg';
import Button from '../common/Button/Button.jsx';

export default function Products() {
  const { subcategory, filteredAndSortedProducts, productAmount } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const [isProductCardsShort, setIsProductCardsShort] = useState(() => {
    const localStorageValue = localStorage.getItem('productCardAppearance');

    if (localStorageValue) {
      if (localStorageValue === 'short') return true;
      if (localStorageValue === 'long') return false;
    }

    return true;
  });

  const productCards = filteredAndSortedProducts.map((p) => (
    <ProductCard
      key={p.id}
      name={p.name}
      id={p.id}
      price={p.price}
      oldPrice={p.oldPrice}
      isShortCard={isProductCardsShort}
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
        <div className={productsCls.infoBlock}>
          <p
            className={classNames(textCls.text, textCls.textBlack)}
            aria-atomic="true"
            aria-live="assertive"
          >
            Всего товаров:
            <span>
              {` ${productAmount}`}
            </span>
          </p>
        </div>
        <SortBlock
          isProductCardsShort={isProductCardsShort}
          setIsProductCardsShort={setIsProductCardsShort}
        />
        <FilterBlock />
        <div
          className={isProductCardsShort ? productsCls.products : productsCls.products_long}
        >
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
