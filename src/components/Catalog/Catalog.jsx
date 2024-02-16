import classNames from 'classnames';
import catalogCls from './Catalog.module.scss';
import textCls from '../../scss/_text.module.scss';
import containerCls from '../../scss/_container.module.scss';
import Category from './CatalogCategory/CatalogCategory.jsx';

export default function Catalog() {
  return (
    <main className={classNames(catalogCls.catalog, containerCls.container)}>
      <h1
        className={classNames(
          catalogCls.title,
          textCls.text,
          textCls.textFw800,
          textCls.text48px,
          textCls.textBlack,
        )}
      >
        Каталог
      </h1>
      <div className={catalogCls.categoryBlock}>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>
    </main>
  );
}
