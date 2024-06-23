import { Suspense, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import classNames from 'classnames';
import DynamicImage from '../../common/DynamicImage/DynamicImage';
import Spinner from '../../common/Spinner/Spinner';
import categoryCls from './CatalogCategory.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import { CategoryShort } from '../../../utils/dataAPI';

interface CategoryProps {
  categoryProps: CategoryShort,
  figureId: number,
}

const Category: React.FC<CategoryProps> = ({ categoryProps, figureId }) => {
  const subcategories = Object.values(categoryProps.subcategories.entities);

  const [figureSrc] = useState(() => import(`./images/figure_${figureId}.svg?url`));
  const [imgSrc] = useState(() => import(`../../../assets/images/categoryImgs/${categoryProps.id}.webp`));

  return (
    <nav className={categoryCls.category}>
      <Link
        to={categoryProps.id}
        className={categoryCls.imageLink}
      >
        <Suspense>
          <Await resolve={figureSrc}>
            <DynamicImage
              className={categoryCls.figureImg}
              alt="Background figure"
            />
          </Await>
        </Suspense>
        <Suspense
          fallback={<Spinner className={categoryCls.spinner} />}
        >
          <Await
            resolve={imgSrc}
            errorElement={<p>{categoryProps.imgAlt}</p>}
          >
            <DynamicImage
              className={categoryCls.productImg}
              alt={categoryProps.imgAlt}
            />
          </Await>
        </Suspense>
      </Link>
      <Link
        to={categoryProps.id}
        className={classNames(
          categoryCls.mainLink,
          linkCls.link,
          linkCls.linkFw800,
          linkCls.link21px,
        )}
      >
        {categoryProps.name}
      </Link>
      <nav className={categoryCls.additionalLinkBlock}>
        <ul className={categoryCls.additionalLinkList}>
          {subcategories.map((subC) => (
            <li
              key={subC?.id}
              className={categoryCls.additionalLinkListElement}
            >
              <Link
                to={`${categoryProps.id}/${subC?.id}`}
                className={categoryCls.additionalLink}
              >
                {subC?.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </nav>
  );
};

export default Category;
