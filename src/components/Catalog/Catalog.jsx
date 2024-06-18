/* eslint-disable no-plusplus */
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { useGetCategoriesQuery } from '../../queryAPI/queryAPI';
import useOnResize from '../../hooks/useOnResize';
import Category from './CatalogCategory/CatalogCategory.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import Button from '../common/Button/Button';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import catalogCls from './Catalog.module.scss';

export default function Catalog() {
  const catalogRef = useRef(null);
  const categoryBlockRef = useRef(null);

  const [categories, setCategories] = useState(null);
  const [isAccordionNeeded, setIsAccordionNeeded] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { data } = useGetCategoriesQuery();

  if (data && categories === null) {
    setCategories(data.entities);
  }

  const calcCollapsedHeight = useCallback(() => {
    const categoryBlock = categoryBlockRef.current;

    const gap = +getComputedStyle(categoryBlock).rowGap.match(/\d+/)[0];
    const fourthBlockOffsetTop = categoryBlock.children[3]?.offsetTop;
    return fourthBlockOffsetTop - gap;
  }, []);

  const calcExpandedHeight = useCallback(() => {
    const categoryBlock = categoryBlockRef.current;
    return categoryBlock.scrollHeight;
  }, []);

  const buttonOnClick = useCallback(() => {
    setIsAccordionOpen(!isAccordionOpen);
    const categoryBlock = categoryBlockRef.current;

    categoryBlock.style.transition = 'height 1s ease-in-out';
    categoryBlock.addEventListener('transitionend', () => {
      categoryBlock.style.transition = '';
    }, { once: true });

    if (!isAccordionOpen) {
      categoryBlock.style.height = `${calcExpandedHeight()}px`;
    } else {
      categoryBlock.style.height = `${calcCollapsedHeight()}px`;
      catalogRef.current.scrollIntoView();
    }
  }, [isAccordionOpen, calcExpandedHeight, calcCollapsedHeight]);

  const checkAccordionOnResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsAccordionNeeded(true);
    } else {
      setIsAccordionNeeded(false);
    }
  }, []);

  useOnResize(checkAccordionOnResize);

  useLayoutEffect(checkAccordionOnResize, [checkAccordionOnResize]);

  const changeHeightOnResize = useCallback(() => {
    if (!isAccordionNeeded) return;

    const categoryBlock = categoryBlockRef.current;

    if (isAccordionOpen) {
      categoryBlock.style.height = '';
      categoryBlock.style.height = `${calcExpandedHeight()}px`;
    } else {
      categoryBlock.style.height = `${calcCollapsedHeight()}px`;
    }
  }, [isAccordionNeeded, isAccordionOpen, calcExpandedHeight, calcCollapsedHeight]);

  useOnResize(changeHeightOnResize);

  useEffect(() => {
    const categoryBlock = categoryBlockRef.current;

    if (isAccordionNeeded && categories) {
      categoryBlock.style.height = `${calcCollapsedHeight()}px`;
      categoryBlock.style.overflowY = 'hidden';
    }

    return () => {
      setIsAccordionOpen(false);
      categoryBlock.style.height = '';
      categoryBlock.style.overflowY = '';
    };
  }, [isAccordionNeeded, categories, calcCollapsedHeight]);

  const categoryElements = useMemo(() => {
    if (!categories) return;

    let figureId = 1;

    return Object.values(categories).map((categoryProps) => {
      if (figureId > 9) figureId = 1;

      return (
        <Category
          key={categoryProps.id}
          categoryProps={categoryProps}
          figureId={figureId++}
        />
      );
    });
  }, [categories]);

  return (
    <main
      className={classNames(catalogCls.catalog, containerCls.container)}
      ref={catalogRef}
    >
      <h1
        className={classNames(
          catalogCls.title,
          textCls.text,
          textCls.textFw800,
          textCls.text48px,
          textCls.textBlack,
        )}
      >
        Каталог
      </h1>
      <div
        ref={categoryBlockRef}
        className={catalogCls.categoryBlock}
      >
        {categoryElements || (
          <ThreeDotsSpinnerBlock
            blockClassName={catalogCls.spinnerBlock}
          />
        )}
      </div>
      {categories && (
        <Button
          className={catalogCls.button}
          onClick={buttonOnClick}
        >
          {isAccordionOpen ? 'Приховати' : 'Показати більше'}
        </Button>
      )}
    </main>
  );
}
