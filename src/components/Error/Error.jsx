import { Link, useRouteError } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import errorCls from './Error.module.scss';
import LineIcon from '../../assets/images/icons/oblique.svg';

export default function Error() {
  const err = useRouteError();

  const message = err.message || err.data || 'Виникла невідома помилка';
  const { status } = err;

  console.error(err);

  return (
    <main className={classNames(
      containerCls.container,
      errorCls.main,
    )}
    >
      <div className={errorCls.messageBlock}>
        <p className={classNames(
          textCls.text,
          textCls.text21px,
          textCls.textBlack,
          errorCls.messageText,
        )}
        >
          {message}
        </p>
        <Link
          className={errorCls.backToMainLink}
          to="/"
          alt="Головна сторінка"
        >
          Повернутися на головну
        </Link>
      </div>
      <div className={errorCls.statusBlock}>
        <LineIcon className={errorCls.lineIcon} />
        <p className={classNames(
          textCls.text,
          textCls.textFw800,
          textCls.textBlack,
          errorCls.statusText,
        )}
        >
          {status || '500'}
        </p>
      </div>
    </main>
  );
}
