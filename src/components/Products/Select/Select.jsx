import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import textCls from '../../../scss/_text.module.scss';
import selectCls from './Select.module.scss';
import ChevronUp from '../../../assets/images/icons/chevronUp.svg';

const Select = memo(({
  label, options, defaultSelectedOptionId, searchParamName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(defaultSelectedOptionId);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const openButtonRef = useRef(null);
  const selectRef = useRef(null);
  const listRef = useRef(null);

  const closeOnClick = useCallback(() => {
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', (e) => {
          if (e.target.closest('[data-select]') !== selectRef.current) {
            setIsOpen(false);
          }
        }, { once: true });
      });
    }
  }, [isOpen]);

  useEffect(closeOnClick, [closeOnClick]);

  if (searchParams.has(searchParamName)) {
    const searchParamValue = searchParams.get(searchParamName);

    if (searchParamValue !== selectedOptionId) {
      setSelectedOptionId(searchParamValue);
    }
  } else if (selectedOptionId !== defaultSelectedOptionId) {
    setSelectedOptionId(defaultSelectedOptionId);
  }

  function openButtonOnClick() {
    setIsOpen(!isOpen);
    setFocusedOptionIndex(-1);

    if (!isOpen) {
      setTimeout(() => {
        listRef.current.focus();
      }, 0);
    }
  }

  function optionListOnClick(e) {
    const option = e.target.closest('[role="option"]');
    if (!option) return;

    const newOptionId = option.id;

    setSelectedOptionId(newOptionId);
    setIsOpen(false);

    searchParams.set(searchParamName, newOptionId);
    setSearchParams(searchParams);

    openButtonRef.current.focus();
  }

  function optionListOnKeyDown(e) {
    if (e.code === 'ArrowDown') {
      e.preventDefault();

      let newFocusedOptionIndex = focusedOptionIndex + 1;
      if (newFocusedOptionIndex === options.length) newFocusedOptionIndex = 0;

      listRef.current.children[newFocusedOptionIndex].focus();
      setFocusedOptionIndex(newFocusedOptionIndex);
    } else if (e.code === 'ArrowUp') {
      e.preventDefault();

      let newFocusedOptionIndex = focusedOptionIndex - 1;
      if (newFocusedOptionIndex < 0) newFocusedOptionIndex = options.length - 1;

      listRef.current.children[newFocusedOptionIndex].focus();

      setFocusedOptionIndex(newFocusedOptionIndex);
    } else if (e.code === 'Home') {
      e.preventDefault();

      const newFocusedOptionIndex = 0;
      listRef.current.children[newFocusedOptionIndex].focus();

      setFocusedOptionIndex(newFocusedOptionIndex);
    } else if (e.code === 'End') {
      e.preventDefault();

      const newFocusedOptionIndex = options.length - 1;
      listRef.current.children[newFocusedOptionIndex].focus();

      setFocusedOptionIndex(newFocusedOptionIndex);
    }
  }

  const selectedOption = options.find((o) => o.id === selectedOptionId);

  const optionButtons = options.map((p, i) => (
    <button
      key={p.id}
      type="button"
      className={classNames(
        selectCls.option,
        selectedOptionId === p.id && selectCls.option_active,
      )}
      id={p.id}
      role="option"
      aria-selected={selectedOptionId === p.id}
      style={{
        paddingTop: i === 0 ? '12px' : '',
        paddingBottom: i === options.length - 1 ? '12px' : '',
      }}
    >
      {p.name}
    </button>
  ));

  return (
    <form
      className={selectCls.selectForm}
    >
      <p className={classNames(textCls.text, textCls.textBlack, selectCls.label)}>
        {`${label}:`}
      </p>
      <div
        ref={selectRef}
        className={selectCls.select}
        data-select
      >
        <button
          ref={openButtonRef}
          className={selectCls.openButton}
          type="button"
          onClick={openButtonOnClick}
          aria-label={`Відкрити селектор ${label}`}
        >
          {selectedOption.name}
          <ChevronUp
            className={classNames(
              selectCls.chevron,
              isOpen && selectCls.chevron_active,
            )}
          />
        </button>
        <div
          ref={listRef}
          onClick={optionListOnClick}
          onKeyDown={optionListOnKeyDown}
          className={selectCls.optionList}
          style={{ display: isOpen ? '' : 'none' }}
          role="listbox"
          aria-activedescendant={selectedOptionId}
          tabIndex="0"
        >
          {optionButtons}
        </div>
      </div>
    </form>
  );
});

export default Select;
