import {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import textCls from '../../../scss/_text.module.scss';
import selectCls from './Select.module.scss';
import Chevron from './images/chevron.svg';

const Select = memo(({
  label, options, defaultSelectedOptionId, searchParamName,
}) => {
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(() => {
    if (searchParams.has(searchParamName)) {
      return searchParams.get(searchParamName);
    }

    return defaultSelectedOptionId;
  });
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const openButtonRef = useRef(null);
  const listRef = useRef(null);

  const navigationOnChange = useCallback(() => {
    if (navigation.state === 'loading') {
      const urlSearchParams = new URLSearchParams(navigation.location.search);

      if (urlSearchParams.has(searchParamName)) {
        setSelectedOptionId(urlSearchParams.get(searchParamName));
      } else {
        setSelectedOptionId(defaultSelectedOptionId);
      }
    }
  }, [navigation, searchParamName, defaultSelectedOptionId]);

  useEffect(navigationOnChange, [navigationOnChange]);

  function formOnSubmit(e) {
    e.preventDefault();

    searchParams.set(searchParamName, selectedOptionId);
    setSearchParams(searchParams);
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

    setSelectedOptionId(option.id);
    setIsOpen(false);

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
      type="submit"
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
      onSubmit={formOnSubmit}
      className={selectCls.selectForm}
    >
      <p className={classNames(textCls.text, textCls.textBlack, selectCls.label)}>
        {`${label}:`}
      </p>
      <div className={selectCls.select}>
        <button
          ref={openButtonRef}
          className={selectCls.openButton}
          type="button"
          onClick={openButtonOnClick}
          aria-label={`Відкрити селектор ${label}`}
        >
          {selectedOption.name}
          <Chevron
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
