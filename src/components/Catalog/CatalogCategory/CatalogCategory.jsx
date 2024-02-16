import classNames from 'classnames';
import { Link } from 'react-router-dom';
import categoryCls from './CatalogCategory.module.scss';
import linkCls from '../../../scss/_link.module.scss';

import Figure from './images/figure_1.svg';
import product from './images/product_1.png';

export default function Category() {
  return (
    <nav className={categoryCls.category}>
      <Link to="/" className={categoryCls.imageLink} alt="Эмали">
        <Figure className={categoryCls.figureImg} />
        <img src={product} className={categoryCls.productImg} alt="Эмаль Dulux Master" />
      </Link>
      <Link
        to="/"
        className={classNames(
          categoryCls.mainLink,
          linkCls.link,
          linkCls.linkFw800,
          linkCls.link21px,
        )}
        alt="Эмаль Dulux Master"
      >
        Эмали
      </Link>
      <nav className={categoryCls.additionalLinkBlock}>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Алкидные эмали"
        >
          Алкидные эмали
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Акриловые эмали"
        >
          Акриловые эмали
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Нитроэмали"
        >
          Нитроэмали
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Масляные краски"
        >
          Масляные краски
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Грунты ГФ и ГЭ"
        >
          Грунты ГФ и ГЭ
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Эмали спецназначения"
        >
          Эмали спецназначения
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Растворители"
        >
          Растворители
        </Link>
        <Link
          to="/"
          className={categoryCls.additionalLink}
          alt="Специальные грунты"
        >
          Специальные грунты
        </Link>
      </nav>
    </nav>
  );
}
