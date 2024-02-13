import { Link } from 'react-router-dom';
import classNames from 'classnames';
import headerMenuCls from './HeaderMenu.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import textCls from '../../../scss/_text.module.scss';
import productImg from './images/product.png';

export default function HeaderMenu({ isMenuOpen, topCoord }) {
  return (
    <div
      className={
      classNames(containerCls.container, headerMenuCls.menu, isMenuOpen && headerMenuCls.menu_open)
    }
      style={{ top: topCoord }}
    >
      <nav className={headerMenuCls.mainLinkBlock}>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Эмали</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Краски</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Пены, герметики, клей</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Защита для древесины</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Инструменты</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Оконная комплектация</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Общестроительные материалы</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Крепеж</Link>
        <Link to="/" className={classNames(headerMenuCls.mainLink)}>Хозтовары</Link>
      </nav>
      <nav className={headerMenuCls.additionalLinkBlock}>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Алкидные эмали</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Акриловые эмали</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Нитроэмали</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Масляные краски</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Спецэмали</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Молотковые краски</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Грунты и грунт-эмали</Link>
        <Link to="/" className={classNames(linkCls.link, linkCls.link18px)}>Растворители</Link>
      </nav>
      <article className={headerMenuCls.popularBlock}>
        <p className={
          classNames(textCls.text, textCls.textFw800, textCls.text18px, headerMenuCls.popularTitle)
        }
        >
          Популярное сегодня
        </p>
        <div className={headerMenuCls.productCard}>
          <Link to="/" className={headerMenuCls.imgLink} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв">
            <img src={productImg} className={headerMenuCls.productImg} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв" />
          </Link>
          <div className={headerMenuCls.nameAndPriceBlock}>
            <Link to="/" className={linkCls.link} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв">
              Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв
            </Link>
            <div className={headerMenuCls.priceBlock}>
              <p className={headerMenuCls.oldPrice}>3 512 ₽/шт</p>
              <p className={headerMenuCls.actualPrice}>
                3 088
                <span className={headerMenuCls.actualPriceSpan}>₽/шт</span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
