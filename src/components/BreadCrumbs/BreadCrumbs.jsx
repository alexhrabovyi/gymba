import { useState, Fragment } from 'react';
import { Link, useFetcher, useParams } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import breadcrumbsCls from './BreadCrumbs.module.scss';

export default function BreadCrumbs() {
  const params = useParams();
  const breadCrumbsFetcher = useFetcher();

  const [fetcherData, setFetcherData] = useState(null);

  if (params.categoryId && params.subcategoryId) {
    const requestList = {
      categoryId: params.categoryId,
    };

    if (params.subcategoryId && params.productId) requestList.subcategoryId = params.subcategoryId;

    if (!fetcherData && breadCrumbsFetcher.state === 'idle') {
      const requestListJSON = JSON.stringify(requestList);

      breadCrumbsFetcher.submit(requestListJSON, {
        action: '/getBreadCrumbsInfo',
        method: 'POST',
        encType: 'application/json',
      });
    }
  }

  if (breadCrumbsFetcher.data && breadCrumbsFetcher.data !== fetcherData) {
    setFetcherData(breadCrumbsFetcher.data);
  }

  const links = [];

  if (fetcherData) {
    Object.values(fetcherData).forEach(({ id, name, link }) => {
      links.push((
        <Fragment key={id}>
          <li>
            <span className={breadcrumbsCls.circle} />
          </li>
          <li>
            <Link
              className={classNames(
                breadcrumbsCls.link,
              )}
              to={link}
              alt={name}
            >
              {name}
            </Link>
          </li>
        </Fragment>
      ));
    });
  } else if (params.articleId) {
    links.push((
      <Fragment key="news">
        <li>
          <span className={breadcrumbsCls.circle} />
        </li>
        <li>
          <Link
            className={classNames(
              breadcrumbsCls.link,
            )}
            to="/news"
            alt="Новини"
          >
            Новини
          </Link>
        </li>
      </Fragment>
    ));
  }

  return (
    <nav className={classNames(containerCls.container, breadcrumbsCls.nav)}>
      <ul className={breadcrumbsCls.list}>
        <li>
          <Link className={breadcrumbsCls.link} to="/" alt="Головна">
            Головна
          </Link>
        </li>
        {links}
      </ul>
    </nav>
  );
}
