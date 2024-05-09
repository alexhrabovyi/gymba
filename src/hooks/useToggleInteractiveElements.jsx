/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import findAllInteractiveElements from '../utils/findAllInteractiveElements';

export default function useToggleInteractiveElements(
  mainElementRef,
  isActive,
  additionalDependeciesArr = [],
) {
  const disableInteractiveElements = useCallback(() => {
    const mainElement = mainElementRef.current;

    let noMainElements;
    let mainElements;

    if (isActive) {
      noMainElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));

      noMainElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    } else {
      mainElements = Array.from(findAllInteractiveElements(mainElement));

      mainElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    }

    return () => {
      if (isActive) {
        noMainElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = false;
        });
      } else {
        mainElements.forEach((el) => {
          el.tabIndex = '0';
          el.ariaHidden = false;
        });
      }
    };
  }, [mainElementRef, isActive, ...additionalDependeciesArr]);

  useEffect(disableInteractiveElements, [disableInteractiveElements]);
}
