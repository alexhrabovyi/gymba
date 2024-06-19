import { memo, useMemo } from 'react';
import classNames from 'classnames';
import filterCls from './FilterBlock.module.scss';
import FilterForm from './FilterForm/FilterForm.jsx';
import FilterPriceForm from './FilterPriceForm/FilterPriceForm.jsx';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';

const FilterBlock = memo(({ subcategoryFilters, isFetching }) => {
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
    <div className={classNames(
      filterCls.filterBlock,
      filterElems && isFetching && filterCls.filterBlock_inactive,
    )}
    >
      <FilterPriceForm />
      {filterElems || <ThreeDotsSpinnerBlock />}
    </div>
  );
});

export default FilterBlock;
