/* eslint-disable no-plusplus */
import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useLoaderData } from 'react-router-dom';
import catalogCls from './Catalog.module.scss';
import textCls from '../../scss/_text.module.scss';
import containerCls from '../../scss/_container.module.scss';
import Category from './CatalogCategory/CatalogCategory.jsx';
import Button from '../common/Button/Button.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';

export default function Catalog() {
  const categories = useLoaderData();
  const [isAccordionNeeded, setIsAccordionNeeded] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const categoryBlockRef = useRef(null);

  const onResizeCallback = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsAccordionNeeded(true);
    } else {
      setIsAccordionNeeded(false);
    }
  }, []);

  useOnResize(onResizeCallback);

  useEffect(() => {
    const categoryBlock = categoryBlockRef.current;

    if (isAccordionNeeded && categories.length > 3) {
      const gap = +getComputedStyle(categoryBlock).rowGap.match(/\d+/)[0];

      const firstBlockHeight = categoryBlock.children[0].offsetHeight;
      const secondBlockHeight = categoryBlock.children[1].offsetHeight;
      const thirdBlockHeight = categoryBlock.children[2].offsetHeight;

      const newHeight = firstBlockHeight + secondBlockHeight + thirdBlockHeight + gap * 2;

      categoryBlock.style.height = `${newHeight}px`;
      categoryBlock.style.overflowY = 'hidden';
    }

    return () => {
      setIsAccordionOpen(false);
      categoryBlock.style.height = '';
      categoryBlock.style.overflowY = '';
    };
  }, [isAccordionNeeded, categories]);

  useEffect(() => {
    const categoryBlock = categoryBlockRef.current;
    const prevHeight = +getComputedStyle(categoryBlock).height.match(/\d+/)[0];

    if (isAccordionOpen) {
      categoryBlock.style.height = `${categoryBlock.scrollHeight}px`;
    }

    return () => {
      categoryBlock.style.height = `${prevHeight}px`;
    };
  }, [isAccordionOpen]);

  let figureId = 1;

  const categoryElements = categories.map((categoryProps) => {
    if (figureId > 9) figureId = 1;

    return (
      <Category
        key={categoryProps.id}
        categoryProps={categoryProps}
        figureId={figureId++}
      />
    );
  });

  return (
    <main className={classNames(catalogCls.catalog, containerCls.container)}>
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
        {categoryElements}
      </div>
      <Button
        className={catalogCls.button}
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        {isAccordionOpen ? 'Скрыть' : 'Показать больше'}
      </Button>
    </main>
  );
}
