import { Fragment } from 'react';
import { Link, useMatches } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import breadcrumbsCls from './BreadCrumbs.module.scss';

export default function BreadCrumbs() {
  const matches = useMatches();

  const links = [];

  const { data } = matches[matches.length - 1];

  (Object.keys(matches[matches.length - 1].params)).forEach((k, i, keys) => {
    const isLast = i === keys.length - 1;

    let to;
    let name;

    if (k === 'categoryId') {
      to = data.id;
      name = data.name;
    }

    links.push((
      <Fragment key={to}>
        <li>
          <span className={breadcrumbsCls.circle} />
        </li>
        <li>
          <Link
            className={classNames(
              breadcrumbsCls.link,
              isLast && breadcrumbsCls.link_disabled,
            )}
            to={`/${to}`}
            alt={name}
            disabled={isLast}
            tabIndex={isLast ? '-1' : '0'}
            aria-hidden={isLast}
          >
            {name}
          </Link>
        </li>
      </Fragment>
    ));
  });

  return (
    <nav className={classNames(containerCls.container, breadcrumbsCls.nav)}>
      <ul className={breadcrumbsCls.list}>
        <li>
          <Link className={breadcrumbsCls.link} to="/" alt="Главная">
            Главная
          </Link>
        </li>
        {links}
      </ul>
    </nav>
  );
}
