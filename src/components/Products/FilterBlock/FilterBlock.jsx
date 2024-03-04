/* eslint-disable no-shadow */
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import filterCls from './FilterBlock.module.scss';
import FilterForm from './FilterForm/FilterForm.jsx';
import FilterPriceForm from './FilterPriceForm/FilterPriceForm.jsx';

export default function FilterBlock() {
  const { subcategoryFilters } = useLoaderData();

  const filterElems = useMemo(() => Object.entries(subcategoryFilters).map(([key, value], i) => (
    <FilterForm
      key={key}
      name={key}
      values={value}
      initIsClosed={i > 1}
    />
  )), [subcategoryFilters]);

  return (
    <div className={filterCls.filterBlock}>
      <FilterPriceForm />
      {filterElems}
    </div>
  );
}
