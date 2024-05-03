import { useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetCategoriesQuery } from '../../queryAPI/queryAPI';
import containerCls from '../../scss/_container.module.scss';
import breadcrumbsCls from './BreadCrumbs.module.scss';

export default function BreadCrumbs() {
  const params = useParams();

  const [fetchedData, setFetchedData] = useState(null);

  const { data } = useGetCategoriesQuery();
  if (data && fetchedData === null) {
    setFetchedData(data);
  }

  function createLink(id, name, link) {
    return (
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
    );
  }

  const links = [];

  if (fetchedData && params.categoryId && params.subcategoryId) {
    const category = fetchedData.entities[params.categoryId];

    if (!category) return;

    links.push(createLink(category.id, category.name, `/${category.id}`));

    if (params.subcategoryId && params.productId) {
      const subcategory = category.subcategories.entities[params.subcategoryId];

      if (!subcategory) return;

      links.push(createLink(subcategory.id, subcategory.name, `/${category.id}/${subcategory.id}`));
    }
  } else if (params.articleId) {
    links.push(createLink('news', 'Новини', '/news'));
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
