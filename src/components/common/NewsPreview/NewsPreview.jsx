import { Suspense, memo, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner.jsx';
import DynamicImage from '../DynamicImage/DynamicImage.jsx';
import beautifyNum from '../../../utils/beautifyNum.js';
import textCls from '../../../scss/_text.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import previewCls from './NewsPreview.module.scss';
import ViewsIcon from '../../../assets/images/icons/views.svg';

const NewsPreview = memo(({
  name, id, date, views,
}) => {
  const [imgSrc] = useState(() => import(`../../../assets/images/newsImgs/${id}.webp`));

  return (
    <div className={previewCls.preview}>
      <Link
        to={`/news/${id}`}
        className={previewCls.imgLink}
        alt={name}
      >
        <Suspense
          fallback={<Spinner className={previewCls.spinner} />}
        >
          <Await
            resolve={imgSrc}
            errorElement={<p>{name}</p>}
          >
            <DynamicImage
              className={previewCls.img}
              alt={name}
            />
          </Await>
        </Suspense>
      </Link>
      <div className={previewCls.infoBlock}>
        <p className={classNames(textCls.text, previewCls.text)}>{date}</p>
        <div className={previewCls.viewBlock}>
          <ViewsIcon />
          <p className={
            classNames(textCls.text, previewCls.text)
          }
          >
            {beautifyNum(views)}
          </p>
        </div>
      </div>
      <Link
        to={`/news/${id}`}
        className={classNames(linkCls.link, linkCls.link21px)}
        alt={name}
      >
        {name}
      </Link>
    </div>
  );
});

export default NewsPreview;
