import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import BarsSpinner from '../../components/common/BarsSpinner/BarsSpinner';
import FooterLazy from '../../components/Footer/Footer.lazy';
import containerCls from '../../scss/_container.module.scss';
import layoutCls from './HeaderAndFooterLayout.module.scss';

export const HeaderAndFooterLayout: React.FC = () => {
  const fallback = (
    <div className={classNames(
      containerCls.container,
      layoutCls.fallbackBlock,
    )}
    >
      <BarsSpinner />
    </div>
  );

  return (
    <>
      <Header />
      <Suspense fallback={fallback}>
        <Outlet />
      </Suspense>
      <Suspense>
        <FooterLazy />
      </Suspense>
    </>
  );
}
