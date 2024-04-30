/* eslint-disable import/prefer-default-export */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../../components/Header/Header.jsx';
import BarsSpinner from '../../components/common/BarsSpinner/BarsSpinner.jsx';
import FooterLazy from '../../components/Footer/Footer.lazy.jsx';
import containerCls from '../../scss/_container.module.scss';
import layoutCls from './HeaderAndFooterLayout.module.scss';

export function HeaderAndFooterLayout() {
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
      {/* <Suspense fallback={fallback}>
        <Outlet />
      </Suspense>
      <Suspense>
        <FooterLazy />
      </Suspense> */}
    </>
  );
}
