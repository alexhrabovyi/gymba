import { useMemo } from 'react';
import sortBlockCls from './SortBlock.module.scss';
import Select from './Select/Select.jsx';

export default function SortBlock() {
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

  return (
    <Select
      label="Сортировать по"
      options={sortSelectOptions}
      defaultSelectedOptionId="default"
      searchParamName="sortBy"
    />
  );
}
