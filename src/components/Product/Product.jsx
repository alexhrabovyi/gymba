/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
import {
  useState, useEffect, Suspense, useMemo, useRef, useCallback, useLayoutEffect,
} from 'react';
import {
  useParams, Await, Link,
} from 'react-router-dom';
import classNames from 'classnames';
import {
  useGetProductQuery,
  useGetWishlistIdsQuery,
  useAddWishlistIdMutation,
  useDeleteWishlistIdMutation,
  useGetCartIdsQuery,
  useAddCartIdMutation,
  useDeleteCartIdMutation,
  useGetCompareIdsQuery,
  useAddCompareIdMutation,
  useDeleteCompareIdMutation,
} from '../../queryAPI/queryAPI';
import useOnResize from '../../hooks/useOnResize';
import findAllInteractiveElements from '../../utils/findAllInteractiveElements';
import Spinner from '../common/Spinner/Spinner.jsx';
import DynamicImage from '../common/DynamicImage/DynamicImage.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import Slider from '../common/Slider/Slider.jsx';
import Button from '../common/Button/Button';
import AddToCartBanner from './AddToCartBanner/AddToCartBanner.jsx';
import AskQuestionBanner from '../common/AskQuestionBanner/AskQuestionBanner.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import Popup from '../common/Popup/Popup.jsx';
import ValidationForm from '../common/ValidationForm/ValidationForm.jsx';
import InputWithErrorMessage from '../common/InputWithErrorMessage/InputWithErrorMessage.jsx';
import TextAreaWithErrorMessage from '../common/TextareaWIthErrorMessage/TextareaWithErrorMessage.jsx';
import AskQuestionPopup from '../common/AskQuestionPopup/AskQuestionPopup.jsx';
import Gallery from './Gallery/Gallery.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import linkCls from '../../scss/_link.module.scss';
import productCls from './Product.module.scss';
import Favorite from '../../assets/images/icons/favorite.svg';
import Compare from '../../assets/images/icons/compare.svg';
import Line from '../../assets/images/icons/oblique.svg';

export default function Product() {
  const params = useParams();

  const descTabPanelRef = useRef();
  const commentTabPanelRef = useRef();
  const openCommentPopupBtnRef = useRef();
  const openQuestionPopupBtnRef = useRef();

  const [productData, setProductData] = useState(null);
  const [imgSrcs, setImgSrcs] = useState([]);
  const [windowWidth, setWindowWidth] = useState(null);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);
  const [productInCompare, setProductInCompare] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(0);
  const [isCartBannerActive, setIsCartBannerActive] = useState(false);
  const [isDescTabPanelActive, setIsDescTabPanelActive] = useState(true);
  const [isCommentPopupActive, setIsCommentPopupActive] = useState(false);
  const [isQuestionPopupActive, setIsQuestionPopupActive] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // setup functions

  const fetchUrl = `${params.categoryId}/${params.subcategoryId}/${params.productId}`;

  const { categoryId, subcategoryId, productId } = params;
  const product = useMemo(() => productData?.product, [productData]);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  // fetch functions

  const {
    status,
    data: fetchedProduct,
    isLoading,
    isFetching,
  } = useGetProductQuery(fetchUrl);

  if (status === 'fulfilled') {
    if (fetchedProduct !== productData) {
      setProductData(fetchedProduct);
    }
  } else if (status === 'rejected') {
    throw new Response(null, { status: 404 });
  }

  const { data: wishlistFetcherData } = useGetWishlistIdsQuery();

  if (wishlistFetcherData) {
    const isInWishlistIdsList = !!wishlistFetcherData.find(([cId, subcId, pId]) => (
      cId === categoryId && subcId === subcategoryId && pId === productId
    ));

    if (productInWishlist !== isInWishlistIdsList) {
      setProductInWishlist(isInWishlistIdsList);
    }
  }

  const { data: cartFetcherData } = useGetCartIdsQuery();

  if (cartFetcherData) {
    const isInCartIdsList = !!cartFetcherData.find((cId) => (cId.categoryId === categoryId
      && cId.subcategoryId === subcategoryId && cId.productId === productId));

    if (productInCart !== isInCartIdsList) {
      setProductInCart(isInCartIdsList);
    }
  }

  const { data: compareFetcherData } = useGetCompareIdsQuery();

  if (compareFetcherData) {
    const isInCompareIdsList = !!compareFetcherData.find(([cId, subcId, pId]) => (
      cId === categoryId && subcId === subcategoryId && pId === productId
    ));

    if (productInCompare !== isInCompareIdsList) {
      setProductInCompare(isInCompareIdsList);
    }
  }

  // main slider functions

  const downloadImages = useCallback(() => {
    if (!product) return;

    const srcs = [[product.id, import(`../../assets/images/productImgs/${product.id}.webp`)]];

    const { additionalImgs } = product;

    if (additionalImgs) {
      additionalImgs.forEach((additionalSrc) => {
        srcs.push([additionalSrc, import(`../../assets/images/productImgs/${additionalSrc}.webp`)]);
      });
    }

    setImgSrcs(srcs);
    setActiveSlideId(0);
  }, [product]);

  useEffect(downloadImages, [downloadImages]);

  const paginationBtns = useMemo(() => (
    imgSrcs.map(([key, src], i) => (
      <button
        key={key}
        type="button"
        className={classNames(
          productCls.paginationBtn,
          i === activeSlideId && productCls.paginationBtn_active,
        )}
        onClick={() => setActiveSlideId(i)}
        aria-label={`Перейти до слайду ${i}`}
      >
        <Suspense
          fallback={<Spinner className={productCls.paginationBtnSpinner} />}
        >
          <Await resolve={src}>
            <DynamicImage
              className={productCls.paginationBtnImg}
              alt={product.name}
            />
          </Await>
        </Suspense>
      </button>
    ))
  ), [imgSrcs, activeSlideId, product]);

  const slides = useMemo(() => {
    const result = imgSrcs.map(([id, src]) => (
      <div
        key={id}
        className={productCls.slide}
      >
        <button
          type="button"
          className={productCls.galleryButton}
          onPointerDown={(downEvent) => {
            const startX = downEvent.clientX;

            document.addEventListener('pointerup', (upEvent) => {
              const endX = upEvent.clientX;
              if (Math.abs(startX - endX) > 5) return;

              setIsGalleryOpen(true);
            }, { once: true });
          }}
          aria-haspopup="dialog"
          aria-label="Відкрити зображення на весь екран"
        >
          <Suspense
            fallback={<Spinner className={productCls.slideImgSpinner} />}
          >
            <Await resolve={src}>
              <DynamicImage
                className={productCls.slideImg}
                alt={product.name}
              />
            </Await>
          </Suspense>
        </button>
      </div>
    ));

    return result;
  }, [product, imgSrcs]);

  // mainSpecs and price functions

  const mainSpecsElems = useMemo(() => {
    if (!product) return;

    const { mainSpecs } = product;

    return Object.entries(mainSpecs).map(([name, value]) => (
      <li
        key={name}
        className={productCls.mainSpec}
      >
        <p className={classNames(
          textCls.text,
          textCls.textGrey,
        )}
        >
          {`${name}:`}
        </p>
        <p className={classNames(
          textCls.text,
          textCls.textBlack,
        )}
        >
          {value}
        </p>
      </li>
    ));
  }, [product]);

  let discountPercent;

  if (product && product.oldPrice) {
    discountPercent = ((product.oldPrice - product.price) / product.oldPrice) * 100;
    discountPercent = discountPercent.toFixed(0);
  }

  // tabs function

  const disableTabPanelElements = useCallback(() => {
    if (!product) return;

    let interactiveElems;

    if (isDescTabPanelActive) {
      interactiveElems = findAllInteractiveElements(commentTabPanelRef.current);
    } else {
      interactiveElems = findAllInteractiveElements(descTabPanelRef.current);
    }

    interactiveElems.forEach((el) => {
      el.tabIndex = '-1';
      el.setAttribute('aria-hidden', true);
    });

    return () => {
      interactiveElems.forEach((el) => {
        el.tabIndex = '0';
        el.setAttribute('aria-hidden', false);
      });
    };
  }, [product, isDescTabPanelActive]);

  useEffect(disableTabPanelElements, [disableTabPanelElements]);

  // description and specs block

  const descriptionBlock = useMemo(() => {
    if (!product || !product.description) return;

    return (
      <div className={productCls.descriptionBlock}>
        <p className={classNames(
          textCls.text,
          textCls.textFw800,
          textCls.text32px,
          textCls.textBlack,
          productCls.descriptionSubtitle,
        )}
        >
          Про товар
        </p>
        <p className={classNames(
          textCls.text,
          textCls.textBlack,
        )}
        >
          {product.description}
        </p>
      </div>
    );
  }, [product]);

  const specsBlock = useMemo(() => {
    if (!product) return;

    const allSpecs = Object.entries({ ...product['specs-filters'], ...product.specs });

    return (
      <div className={productCls.specsBlock}>
        <p className={classNames(
          textCls.text,
          textCls.textFw800,
          textCls.text24px,
          textCls.textBlack,
          productCls.specsTitle,
        )}
        >
          Характеристики
        </p>
        <ul className={productCls.specsList}>
          {allSpecs.map(([name, value], i) => {
            if (typeof value === 'object') {
              value = value.join(', ');
            }

            return (
              <li
                key={i}
                className={productCls.spec}
              >
                <p className={classNames(
                  textCls.text,
                  textCls.textGrey,
                )}
                >
                  {`${name}:`}
                </p>
                <p className={classNames(
                  textCls.text,
                  textCls.textBlack,
                )}
                >
                  {value}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [product]);

  // gallery popup functions

  const imgIdsForGallery = useMemo(() => {
    if (!product) return;

    const result = [product.id];

    const { additionalImgs } = product;

    if (additionalImgs) {
      additionalImgs.forEach((additionalImg) => result.push(additionalImg));
    }

    return result;
  }, [product]);

  // event functions

  function sendMutationRequest(state, addMutationFunc, deleteMutationFunc) {
    const body = JSON.stringify([categoryId, subcategoryId, product.id]);

    if (!state) {
      addMutationFunc(body);
    } else {
      deleteMutationFunc(body);
    }
  }

  const [addToWishlistRequest] = useAddWishlistIdMutation();
  const [deleteFromWishlistRequest] = useDeleteWishlistIdMutation();

  function wishlistButtonOnClick() {
    sendMutationRequest(productInWishlist, addToWishlistRequest, deleteFromWishlistRequest);
  }

  const [addToCartRequest] = useAddCartIdMutation();
  const [deleteFromCartRequest] = useDeleteCartIdMutation();

  function cartButtonOnClick() {
    sendMutationRequest(productInCart, addToCartRequest, deleteFromCartRequest);
  }

  const [addToCompareRequest] = useAddCompareIdMutation();
  const [deleteFromCompareRequest] = useDeleteCompareIdMutation();

  function compareButtonOnClick() {
    sendMutationRequest(productInCompare, addToCompareRequest, deleteFromCompareRequest);
  }

  function askQuestionBtnOnClick() {
    setIsQuestionPopupActive(true);
  }

  return (
    <>
      <main className={classNames(
        containerCls.container,
        productCls.main,
        !isLoading && isFetching && productCls.main_inactive,
      )}
      >
        <h1 className={classNames(
          textCls.text,
          textCls.textFw800,
          textCls.text38px,
          textCls.textBlackj,
          productCls.title,
        )}
        >
          {product?.name}
        </h1>
        {product ? (
          <>
            {windowWidth > 576 && (
            <div className={productCls.additionalButtonsBlock}>
              <button
                type="button"
                className={classNames(
                  productCls.iconButton,
                  productInWishlist && productCls.iconButton_active,
                )}
                onClick={wishlistButtonOnClick}
                aria-label={productInWishlist ? `Видалити ${product.name} зі списку бажань` : `Додати ${product.name} до списку бажань`}
              >
                <Favorite className={productCls.buttonIcon} />
                {!productInWishlist ? 'В обране' : 'В обраному'}
              </button>
              <button
                type="button"
                className={classNames(
                  productCls.iconButton,
                  productInCompare && productCls.iconButton_active,
                )}
                onClick={compareButtonOnClick}
                aria-label={productInCompare ? `Видалити ${product.name} з порівняння` : `Додати ${product.name} в порівняння`}
              >
                <Compare className={productCls.buttonIcon} />
                {!productInCompare ? ' До порівняння' : 'В порівнянні'}
              </button>
            </div>
            )}
            <div className={productCls.mainBlock}>
              <div className={productCls.imageSliderBlock}>
                <div className={productCls.imagePaginationBlock}>
                  {paginationBtns}
                </div>
                <Slider
                  activeSlideId={activeSlideId}
                  setActiveSlideId={setActiveSlideId}
                  slides={slides}
                  gap={20}
                />
              </div>
              <div className={productCls.mainSpecsBlock}>
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text14px,
                  textCls.textBlack,
                  productCls.mainSpecsTitle,
                )}
                >
                  Основні характеристики
                </p>
                <ul className={productCls.mainSpecsList}>
                  {mainSpecsElems}
                </ul>
                <a
                  href="#descriptionTabPanel"
                  className={classNames(
                    linkCls.link,
                    linkCls.linkBlue,
                  )}
                  alt="Переглянути всі характеристики"
                  onClick={() => setIsDescTabPanelActive(true)}
                >
                  Переглянути всі
                </a>
              </div>
              {windowWidth <= 576 && (
              <div className={productCls.additionalButtonsBlock}>
                <button
                  type="button"
                  className={classNames(
                    productCls.iconButton,
                    productInWishlist && productCls.iconButton_active,
                  )}
                  onClick={wishlistButtonOnClick}
                  aria-label={productInWishlist ? `Видалити ${product.name} зі списку бажань` : `Додати ${product.name} до списку бажань`}
                >
                  <Favorite className={productCls.buttonIcon} />
                  {!productInWishlist ? 'В обране' : 'В обраному'}
                </button>
                <button
                  type="button"
                  className={classNames(
                    productCls.iconButton,
                    productInCompare && productCls.iconButton_active,
                  )}
                  onClick={compareButtonOnClick}
                  aria-label={productInCompare ? `Видалити ${product.name} з порівняння` : `Додати ${product.name} в порівняння`}
                >
                  <Compare className={productCls.buttonIcon} />
                  {!productInCompare ? ' До порівняння' : 'В порівнянні'}
                </button>
              </div>
              )}
              <div className={productCls.priceAndCartBlock}>
                {product.oldPrice && (
                <p className={productCls.oldPrice}>
                  {`${product.oldPrice} ₴/шт`}
                </p>
                )}
                <div className={productCls.mainPriceBlock}>
                  <p className={classNames(
                    textCls.text,
                    textCls.textFw800,
                    textCls.text48px,
                    textCls.textBlack,
                    productCls.mainPrice,
                  )}
                  >
                    {product.price}
                  </p>
                  <span className={classNames(
                    textCls.text,
                    textCls.textBlack,
                  )}
                  >
                    ₴/шт
                  </span>
                  {product.oldPrice && (
                  <div className={productCls.discountBlock}>
                    {`-${discountPercent}%`}
                  </div>
                  )}
                </div>
                <div className={productCls.cartBtnAndBannerBlock}>
                  <Button
                    className={productCls.cartButton}
                    ariaLabel={!productInCart ? `Додати ${product.name} до кошику` : `Видалити ${product.name} з кошика`}
                    onClick={cartButtonOnClick}
                  >
                    {!productInCart ? 'Додати до кошику' : 'У кошику'}
                  </Button>
                  <AddToCartBanner
                    isActive={isCartBannerActive}
                    setIsActive={setIsCartBannerActive}
                  />
                </div>
              </div>
            </div>
            <div
              className={productCls.tabList}
              role="tablist"
            >
              <button
                type="button"
                className={productCls.tabButton}
                role="tab"
                aria-selected={isDescTabPanelActive}
                aria-controls="descriptionTabPanel"
                aria-label="Показати панель Опис"
                onClick={() => setIsDescTabPanelActive(true)}
              >
                Опис
                <span
                  className={classNames(
                    productCls.tabButtonLine,
                    isDescTabPanelActive && productCls.tabButtonLine_active,
                  )}
                />
              </button>
              <button
                type="button"
                className={productCls.tabButton}
                role="tab"
                aria-selected={!isDescTabPanelActive}
                aria-controls="commentTabPanel"
                aria-label="Показати панель Відгуки"
                onClick={() => setIsDescTabPanelActive(false)}
              >
                Відгуки
                <span
                  className={classNames(
                    productCls.tabButtonLine,
                    !isDescTabPanelActive && productCls.tabButtonLine_active,
                  )}
                />
              </button>
            </div>
            <div className={productCls.tabPanelsAndBannerBlock}>
              <div className={productCls.tabPanels}>
                <div
                  ref={descTabPanelRef}
                  className={classNames(
                    productCls.tabPanel,
                    isDescTabPanelActive && productCls.tabPanel_active,
                  )}
                  id="descriptionTabPanel"
                  role="tabpanel"
                >
                  {descriptionBlock}
                  {specsBlock}
                </div>
                <div
                  ref={commentTabPanelRef}
                  className={classNames(
                    productCls.tabPanel,
                    !isDescTabPanelActive && productCls.tabPanel_active,
                  )}
                  id="commentTabPanel"
                  role="tabpanel"
                >
                  <div className={productCls.noCommentsBlock}>
                    <div className={productCls.noCommentsTextBlock}>
                      <Line className={productCls.noCommentsLine} />
                      <p className={classNames(
                        textCls.text,
                        textCls.textFw800,
                        textCls.text32px,
                        productCls.noCommentsText,
                      )}
                      >
                        Відгуків немає
                      </p>
                      <p className={classNames(
                        textCls.text,
                        textCls.text24px,
                        textCls.textGrey,
                      )}
                      >
                        Будьте першим, хто залише відгук!
                      </p>
                    </div>
                    <Button
                      ref={openCommentPopupBtnRef}
                      className={productCls.commentButton}
                      onClick={() => setIsCommentPopupActive(true)}
                      aria-haspopup="dialog"
                      aria-label="Відкрити вікно Написати відгук"
                    >
                      Написати відгук
                    </Button>
                  </div>
                </div>
              </div>
              <aside className={productCls.bannerBlock}>
                <AskQuestionBanner
                  title="Є питання щодо товару?"
                  subtitle="Запитайте нас і ми допоможемо Вам визначитися з вибором."
                  btnOnClick={askQuestionBtnOnClick}
                  ref={openQuestionPopupBtnRef}
                />
              </aside>
            </div>
            <RelatedProducts
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              productId={productId}
            />
          </>
        ) : (
          <ThreeDotsSpinnerBlock />
        )}
      </main>
      {product && (
        <>
          <Popup
            isActive={isCommentPopupActive}
            setIsActive={setIsCommentPopupActive}
            label="Вікно написати відгук"
            openButton={openCommentPopupBtnRef.current}
          >
            <p
              className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text36px,
                productCls.popupTitle,
              )}
            >
              Залишити відгук
            </p>
            <ValidationForm
              className={productCls.popupForm}
            >
              <InputWithErrorMessage
                type="text"
                name="name"
                inputClassName={productCls.input}
                placeholder="Ім'я"
                required
              />
              <InputWithErrorMessage
                type="email"
                name="email"
                inputClassName={productCls.input}
                placeholder="Електронна пошта"
                required
              />
              <TextAreaWithErrorMessage
                name="comment"
                textareaBlockClassName={productCls.textareaBlock}
                textareaClassName={productCls.textarea}
                placeholder="Враження про товар"
                required
                textareaType="comment"
              />
              <div className={productCls.submitAndTermsBlock}>
                <Button
                  type="submit"
                  className={productCls.submitButton}
                >
                  Відправити
                </Button>
                <p className={classNames(
                  textCls.text,
                  textCls.text14px,
                  textCls.textBlack,
                )}
                >
                  Надсилаючи повідомлення ви даєте згоду на обробку&nbsp;
                  <Link
                    to="terms"
                    alt="Умови обробки персональних даних"
                    className={classNames(
                      linkCls.link,
                      linkCls.link14px,
                      linkCls.linkBlue,
                    )}
                  >
                    персональних даних
                  </Link>
                </p>
              </div>
            </ValidationForm>
          </Popup>
          <AskQuestionPopup
            isActive={isQuestionPopupActive}
            setIsActive={setIsQuestionPopupActive}
            openButtonRef={openQuestionPopupBtnRef}
          />
          <Gallery
            imgIds={imgIdsForGallery}
            isOpen={isGalleryOpen}
            setIsOpen={setIsGalleryOpen}
            activeSlideId={activeSlideId}
            setActiveSlideId={setActiveSlideId}
            productName={product.name}
          />
        </>
      )}
    </>
  );
}
