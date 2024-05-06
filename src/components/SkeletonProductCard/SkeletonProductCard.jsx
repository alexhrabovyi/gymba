import cardCls from './SkeletonProductCard.module.scss';
import Compare from '../../assets/images/icons/compare.svg';
import Favorite from '../../assets/images/icons/favorite.svg';

export default function SkeletonProductCard() {
  return (
    <div className={cardCls.card}>
      <div className={cardCls.iconsBlock}>
        <Compare className={cardCls.icon} />
        <Favorite className={cardCls.icon} />
      </div>
      <div className={cardCls.fakeImage} />
      <div className={cardCls.textBlock} />
      <div className={cardCls.priceAndCartBlock}>
        <div className={cardCls.fakePrice} />
        <div className={cardCls.fakeCartButton} />
      </div>
    </div>
  );
}
