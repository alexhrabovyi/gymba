import { memo, useMemo } from 'react';
import classNames from 'classnames';
import sortBlockCls from './SortBlock.module.scss';
import Select from './Select/Select.jsx';
import CardsShortIcon from './images/productCardsShort.svg';
import CardsLongIcon from './images/productCardsLong.svg';

const SortBlock = memo(({ isProductCardsShort, setIsProductCardsShort }) => {
  const sortSelectOptions = useMemo(() => [
    {
      name: 'за замовчуванням',
      id: 'default',
    },
    {
      name: 'за назвою (А - Я)',
      id: 'name-A-Z',
    },
    {
      name: 'за назвою (Я - А)',
      id: 'name-Z-A',
    },
    {
      name: 'за ціною (зменшення)',
      id: 'price-down',
    },
    {
      name: 'за ціною (зростання)',
      id: 'price-up',
    },
  ], []);

  const viewSelectOptions = useMemo(() => [
    {
      name: '6',
      id: '6',
    },
    {
      name: '9',
      id: '9',
    },
    {
      name: '12',
      id: '12',
    },
  ], []);

  return (
    <div className={sortBlockCls.sortBlock}>
      <Select
        label="Сортировать по"
        options={sortSelectOptions}
        defaultSelectedOptionId="default"
        searchParamName="sortBy"
      />
      <div className={sortBlockCls.productAppearanceOptions}>
        <Select
          label="Показывать по"
          options={viewSelectOptions}
          defaultSelectedOptionId="12"
          searchParamName="perView"
        />
        <div className={sortBlockCls.buttonsBlock}>
          <button
            className={classNames(
              sortBlockCls.iconButton,
              isProductCardsShort && sortBlockCls.iconButton_active,
            )}
            type="button"
            onClick={() => {
              setIsProductCardsShort(true);
              localStorage.setItem('productCardAppearance', 'short');
            }}
            aria-label="Показувати маленькі карточки товарів"
          >
            <CardsShortIcon className={sortBlockCls.buttonIcon} />
          </button>
          <button
            className={classNames(
              sortBlockCls.iconButton,
              !isProductCardsShort && sortBlockCls.iconButton_active,
            )}
            type="button"
            onClick={() => {
              setIsProductCardsShort(false);
              localStorage.setItem('productCardAppearance', 'long');
            }}
            aria-label="Показувати великі карточки товарів"
          >
            <CardsLongIcon className={sortBlockCls.buttonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default SortBlock;
