import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import textCls from '../../../../scss/_text.module.scss';
import filterCls from './FilterForm.module.scss';
import Chevron from './images/chevron.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox.jsx';

export default function FilterForm({ name, values, initIsClosed = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClosed, setIsClose] = useState(initIsClosed);
  const [params, setParams] = useState([]);

  function onSubmitHandler(e) {
    e.preventDefault();

    const URLParams = new URLSearchParams();
    params.forEach((p) => URLParams.append(name, p));

    searchParams.entries().forEach(([key, value]) => {
      if (key !== name) {
        URLParams.append(key, value);
      }
    });

    setSearchParams(URLParams);
  }

  const checkboxes = useMemo(() => Array.from(values).sort().map((value) => (
    <li key={value}>
      <FilterCheckbox
        name={name}
        value={value}
        updateParams={setParams}
      />
    </li>
  )), [name, values]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className={filterCls.form}
    >
      <button
        type="button"
        className={filterCls.titleButton}
        onClick={() => setIsClose(!isClosed)}
        aria-label={isClosed ? `Расскрыть меню фильтров ${name}` : `Свернуть меню фильтров ${name}`}
      >
        <p className={classNames(
          textCls.text,
          textCls.textFw700,
          filterCls.title,
        )}
        >
          {name}
        </p>
        <Chevron className={classNames(
          filterCls.chevron,
          isClosed && filterCls.chevron_transformed,
        )}
        />
      </button>
      <ul
        className={filterCls.checkboxList}
        style={{ display: isClosed ? 'none' : '' }}
      >
        {checkboxes}
      </ul>
    </form>
  );
}
