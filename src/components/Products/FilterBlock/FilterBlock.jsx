/* eslint-disable no-shadow */
import { memo, useMemo } from 'react';
import filterCls from './FilterBlock.module.scss';
import FilterForm from './FilterForm/FilterForm.jsx';
import FilterPriceForm from './FilterPriceForm/FilterPriceForm.jsx';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';

const FilterBlock = memo(({ subcategoryFilters }) => {
  const filterElems = useMemo(() => {
    if (!subcategoryFilters) return;

    return Object.entries(subcategoryFilters).map(([key, value], i) => (
      <FilterForm
        key={key}
        name={key}
        values={value}
        initIsClosed={i > 1}
      />
    ));
  }, [subcategoryFilters]);

  return (
    <div className={filterCls.filterBlock}>
      <FilterPriceForm />
      {filterElems || <ThreeDotsSpinnerBlock />}
    </div>
  );
});

export default FilterBlock;
