import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import checkboxCls from './FilterCheckbox.module.scss';

export default function FilterCheckbox({ name, value, updateParams }) {
  const [searchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!searchParams.has(name) || !searchParams.getAll(name).includes(value)) {
      setIsChecked(false);
    }
  }, [searchParams, name, value]);

  function onClickHandler() {
    if (!isChecked) {
      updateParams((oldParams) => [...oldParams, value]);
    } else {
      updateParams((oldParams) => oldParams.filter((p) => p !== value));
    }

    setIsChecked(!isChecked);
  }

  return (
    <button
      className={checkboxCls.checkbox}
      type="submit"
      onClick={onClickHandler}
      role="checkbox"
      aria-checked={isChecked}
    >
      <span className={classNames(
        checkboxCls.checkboxSquare,
        isChecked && checkboxCls.checkboxSquare_checked,
      )}
      />
      {value}
    </button>
  );
}
