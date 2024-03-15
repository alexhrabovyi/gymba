import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productCls from './Product.module.scss';
import Favorite from '../../assets/images/icons/favorite.svg';
import Compare from '../../assets/images/icons/compare.svg';

export default function Product() {
  const { product } = useLoaderData();

  const [mainImgSrc] = useState(() => import(`../../assets/images/productImgs/${product.id}`));

  let imageBlock;

  if (product.additionalImgIds) {

  } else {
    imageBlock = (
      <div className={productCls.imageBlock}>

      </div>
    )
  }

  return (
    <main className={classNames(containerCls.container, productCls.main)}>
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlackj,
        productCls.title,
      )}
      >
        {product.name}
      </h1>
      <div className={productCls.additionalButtonsBlock}>
        <button
          type="button"
          className={classNames(
            productCls.iconButton,
            productCls.iconButton_active,
          )}
        >
          В избранное
          <Favorite className={productCls.buttonIcon} />
        </button>
        <button
          type="button"
          className={classNames(
            productCls.iconButton,
            productCls.iconButton_active,
          )}
        >
          К сравнению
          <Compare className={productCls.buttonIcon} />
        </button>
      </div>
      <div className={productCls.mainBlock}>
        {imageBlock}
      </div>
    </main>
  );
}
