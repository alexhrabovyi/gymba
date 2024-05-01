import { Suspense, memo } from 'react';
import { Await, Link } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import textCls from '../../../scss/_text.module.scss';
import subcategoryCls from './Subcategory.module.scss';
import ArrowRight from '../../../assets/images/icons/arrow-right.svg';

const Subcategory = memo(({
  categoryId, id, name, imgId, imgAlt,
}) => {
  const ErrorElement = (
    <div className={classNames(
      textCls.text,
      textCls.textBlack,
    )}
    >
      Зображення не знайдено
    </div>
  );

  return (
    <Link
      to={`${id}`}
      className={subcategoryCls.subcategory}
      alt={name}
      aria-label={name}
    >
      <Suspense
        fallback={<Spinner className={subcategoryCls.spinner} />}
      >
        <Await
          resolve={import(`../../../assets/images/subcategoryImgs/${categoryId}_${imgId}.webp`)}
          errorElement={ErrorElement}
        >
          <DynamicImage
            className={subcategoryCls.img}
            alt={imgAlt}
          />
        </Await>
      </Suspense>
      <div className={subcategoryCls.textBlock}>
        {name}
        <ArrowRight className={subcategoryCls.arrorRight} />
      </div>
    </Link>
  );
});

export default Subcategory;
