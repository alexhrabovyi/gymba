import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import textCls from '../../../../scss/_text.module.scss';
import filterCls from './FilterForm.module.scss';
import ChevronUp from '../../../../assets/images/icons/chevronUp.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox.jsx';

export default function FilterForm({ name, values, initIsClosed = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const listRef = useRef(null);
  const [isClosed, setIsClose] = useState(initIsClosed);
  const [isAdditionalClosed, setIsAdditionalClosed] = useState(true);
  const [params, setParams] = useState([]);

  const isAdditionalAccordionNeeded = values.length >= 8;

  useEffect(() => {
    if (searchParams.has(name)) {
      setParams(searchParams.getAll(name));
    } else {
      setParams([]);
    }
  }, [searchParams, name]);

  function onSubmitHandler(e) {
    e.preventDefault();

    const URLParams = new URLSearchParams();
    params.forEach((p) => URLParams.append(name, p));

    Array.from(searchParams).forEach(([key, value]) => {
      if (key !== name) {
        URLParams.append(key, value);
      }
    });

    setSearchParams(URLParams);
  }

  const checkboxes = values.slice().sort().map((value, i) => (
    <li
      key={value}
      hidden={isAdditionalAccordionNeeded && isAdditionalClosed && i > 4}
    >
      <FilterCheckbox
        value={value}
        isChecked={params.includes(value)}
        updateParams={setParams}
      />
    </li>
  ));

  if (isAdditionalAccordionNeeded) {
    const additionalAccordionButton = (
      <li key="AccordionButton">
        <button
          className={filterCls.additionalButton}
          onClick={() => setIsAdditionalClosed((isAC) => !isAC)}
          type="button"
        >
          {isAdditionalClosed ? 'Показати ще' : 'Згорнути'}
        </button>
      </li>
    );

    if (isAdditionalClosed) {
      checkboxes.splice(4, 1, additionalAccordionButton);
    } else {
      checkboxes.push(additionalAccordionButton);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className={filterCls.form}
    >
      <button
        type="button"
        className={filterCls.titleButton}
        onClick={() => setIsClose(!isClosed)}
        aria-label={isClosed ? `Розкрити меню фільтрів ${name}` : `Згорнути меню фільтрів ${name}`}
      >
        <p className={classNames(
          textCls.text,
          textCls.textFw700,
          filterCls.title,
        )}
        >
          {name}
        </p>
        <ChevronUp className={classNames(
          filterCls.chevron,
          isClosed && filterCls.chevron_transformed,
        )}
        />
      </button>
      <ul
        ref={listRef}
        className={filterCls.checkboxList}
        style={{ display: isClosed ? 'none' : '' }}
      >
        {checkboxes}
      </ul>
    </form>
  );
}
