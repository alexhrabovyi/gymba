import { Suspense, memo } from 'react';
import { Await, Link } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import textCls from '../../../scss/_text.module.scss';
import previewCls from './NewsPreview.module.scss';

const NewsPreview = memo(({ name, id, date, views, previewImgId }) => {
  const imgSrc = import(`./images/preview_${previewImgId}.png`);

  return (
    <div className={previewCls.preview}>
      <Link
        to={`news/${id}`}
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
        <p className={
          classNames(textCls.text, previewCls.text, previewCls.text_withIcon)
        }
        >
          {views}
        </p>
      </div>
    </div>
  );
});

export default NewsPreview;
