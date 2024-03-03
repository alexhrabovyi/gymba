/* eslint-disable no-shadow */
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import filterCls from './FilterBlock.module.scss';
import FilterForm from './FilterForm/FilterForm.jsx';

export default function FilterBlock() {
  const { products } = useLoaderData().subcategory;

  const filters = useMemo(() => {
    const filters = {};

    products.forEach((p) => {
      const specsFilters = p['specs-filters'];

      Object.entries(specsFilters).forEach(([name, value]) => {
        if (!filters[name]) {
          filters[name] = new Set();
        }

        if (typeof value === 'string') {
          filters[name].add(value);
        } else {
          value.forEach((v) => {
            filters[name].add(v);
          });
        }
      });
    });

    return filters;
  }, [products]);

  const filterElems = useMemo(() => Object.entries(filters).map(([key, value], i) => (
    <FilterForm
      key={key}
      name={key}
      values={value}
      initIsClosed={i > 1}
    />
  )), [filters]);

  return (
    <div className={filterCls.filterBlock}>
      {filterElems}
    </div>
  );
}
