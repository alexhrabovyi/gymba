import { memo, useState } from 'react';
import classNames from 'classnames';
import Popup from '../../common/Popup/Popup';
import ValidationForm from '../../common/ValidationForm/ValidationForm';
import InputWithErrorMessage from '../../common/InputWithErrorMessage/InputWithErrorMessage';
import Button from '../../common/Button/Button';
import textCls from '../../../scss/_text.module.scss';
import popupCls from './LoginRegisterPopup.module.scss';

interface LoginRegisterPopupProps {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  openButtonRef: React.MutableRefObject<HTMLButtonElement | null>
}

const LoginRegisterPopup = memo<LoginRegisterPopupProps>(({
  isActive,
  setIsActive,
  openButtonRef,
}) => {
  const [isLoginTabActive, setIsLoginTabActive] = useState<boolean>(true);

  return (
    <Popup
      isActive={isActive}
      setIsActive={setIsActive}
      label="Вікно входу/реєстрації"
      openButton={openButtonRef.current}
    >
      <div
        className={popupCls.tabButtonsBlock}
        role="tablist"
      >
        <button
          type="button"
          className={popupCls.tabButton}
          onClick={() => setIsLoginTabActive(true)}
          role="tab"
          aria-selected={isLoginTabActive}
          aria-controls="loginTabPanel"
          aria-label="Показати панель Вхід"
        >
          Вхід
          <span
            className={classNames(
              popupCls.tabButtonLine,
              isLoginTabActive && popupCls.tabButtonLine_active,
            )}
          />
        </button>
        <button
          type="button"
          className={popupCls.tabButton}
          onClick={() => setIsLoginTabActive(false)}
          role="tab"
          aria-selected={!isLoginTabActive}
          aria-controls="registerTabPanel"
          aria-label="Показати панель Реєстрація"
        >
          Реєстрація
          <span
            className={classNames(
              popupCls.tabButtonLine,
              !isLoginTabActive && popupCls.tabButtonLine_active,
            )}
          />
        </button>
      </div>
      <div className={popupCls.tabContentBlocks}>
        <div
          className={classNames(
            popupCls.tabContentBlock,
            isLoginTabActive && popupCls.tabContentBlock_active,
          )}
          id="loginTabPanel"
          role="tabpanel"
        >
          <ValidationForm
            className={popupCls.form}
          >
            <InputWithErrorMessage
              type="email"
              name="email"
              inputClassName={popupCls.input}
              placeholder="Електронна пошта"
              required
            />
            <InputWithErrorMessage
              type="password"
              name="password"
              inputClassName={popupCls.input}
              placeholder="Пароль"
              required
            />
            <div className={popupCls.submitButtonBlock}>
              <Button
                type="submit"
                className={popupCls.submitButton}
              >
                Відправити
              </Button>
            </div>
          </ValidationForm>
          <div className={popupCls.additionalBlock}>
            <p className={classNames(
              textCls.text,
              textCls.textBlack,
            )}
            >
              Досі не маєте акаунту?
            </p>
            <button
              type="button"
              className={popupCls.alreadyRegisteredBtn}
              onClick={() => setIsLoginTabActive(false)}
              role="tab"
              aria-selected={isLoginTabActive}
              aria-controls="registerTabPanel"
              aria-label="Показати панель Реєстрація"
            >
              Реєстрація
            </button>
          </div>
        </div>
        <div
          className={classNames(
            popupCls.tabContentBlock,
            !isLoginTabActive && popupCls.tabContentBlock_active,
          )}
          id="registerTabPanel"
          role="tabpanel"
        >
          <ValidationForm
            className={popupCls.form}
          >
            <InputWithErrorMessage
              type="text"
              name="fullname"
              inputClassName={popupCls.input}
              inputBlockClassName={popupCls.input_long}
              placeholder="ПІБ"
              required
            />
            <InputWithErrorMessage
              type="tel"
              name="tel"
              inputClassName={popupCls.input}
              placeholder="Телефон"
              required
            />
            <InputWithErrorMessage
              type="email"
              name="email"
              inputClassName={popupCls.input}
              placeholder="Електронна пошта"
              required
            />
            <InputWithErrorMessage
              type="password"
              name="password"
              inputClassName={popupCls.input}
              placeholder="Пароль"
              required
            />
            <InputWithErrorMessage
              type="password"
              name="password_control"
              inputClassName={popupCls.input}
              placeholder="Повторіть пароль"
              required
            />
            <div className={popupCls.submitButtonBlock}>
              <Button
                type="submit"
                className={popupCls.submitButton}
              >
                Відправити
              </Button>
            </div>
          </ValidationForm>
          <div className={popupCls.additionalBlock}>
            <p className={classNames(
              textCls.text,
              textCls.textBlack,
            )}
            >
              Вже реєструвалися?
            </p>
            <button
              type="button"
              className={popupCls.alreadyRegisteredBtn}
              onClick={() => setIsLoginTabActive(true)}
              role="tab"
              aria-selected={isLoginTabActive}
              aria-controls="loginTabPanel"
              aria-label="Показати панель Вхід"
            >
              Увійти
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
});

export default LoginRegisterPopup;
