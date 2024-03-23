import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import bannerCls from './AddToCartBanner.module.scss';

export default function AddToCartBanner({ isActive = false, setIsActive }) {
  const addCloseEvent = useCallback(() => {
    if (isActive) {
      setTimeout(() => {
        document.addEventListener('click', () => {
          setIsActive(false);
        }, { once: true });
      });
    }
  }, [isActive, setIsActive]);

  useEffect(addCloseEvent, [addCloseEvent]);

  const addCloseTimer = useCallback(() => {
    if (isActive) {
      setTimeout(() => setIsActive(false), 3000);
    }
  }, [isActive, setIsActive]);

  useEffect(addCloseTimer, [addCloseTimer]);

  return (
    <div className={classNames(
      bannerCls.banner,
      isActive && bannerCls.banner_active,
    )}
    >
      <span className={bannerCls.triangle} />
      <Link
        className={bannerCls.link}
        to="/cart"
        alt="Перейти в корзину"
        tabIndex={isActive ? '0' : '-1'}
        aria-hidden={!isActive}
      >
        Перейти в корзину
      </Link>
    </div>
  );
}
