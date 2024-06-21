import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import bannerCls from './AddToCartBanner.module.scss';

interface AddToCartBannerProps {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddToCartBanner: React.FC<AddToCartBannerProps> = ({ isActive = false, setIsActive }) => {
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
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
      >
        Перейти до кошику
      </Link>
    </div>
  );
};

export default AddToCartBanner;
