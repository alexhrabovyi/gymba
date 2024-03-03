import { Suspense, memo } from 'react';
import { Await, Link } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import subcategoryCls from './Subcategory.module.scss';
import ArrowRight from './images/arrow-right.svg';

const Subcategory = memo(({
  categoryId, id, name, imgId, imgAlt,
}) => {
  const imgSrc = import(`./images/${categoryId}_${imgId}.png`);

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
        <Await resolve={imgSrc}>
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
