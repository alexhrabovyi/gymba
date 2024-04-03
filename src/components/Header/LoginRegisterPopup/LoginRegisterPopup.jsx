import { memo, useState } from 'react';
import classNames from 'classnames';
import Popup from '../../common/Popup/Popup.jsx';
import ValidationForm from '../../common/ValidationForm/ValidationForm.jsx';
import InputWithErrorMessage from '../../common/InputWithErrorMessage/InputWithErrorMessage.jsx';
import Button from '../../common/Button/Button.jsx';
import textCls from '../../../scss/_text.module.scss';
import popupCls from './LoginRegisterPopup.module.scss';

const LoginRegisterPopup = memo(({ isActive, setIsActive, openButtonRef }) => {
  const [isLoginTabActive, setIsLoginTabActive] = useState(true);

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
              isLoginTabActive && popupCls.tabButtonLine_active,
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
              name="fullName"
              inputClassName={classNames(
                popupCls.input,
                popupCls.input_long,
              )}
              placeholder="ПІБ"
              required
            />
            <InputWithErrorMessage
              type="tel"
              name="tel"
              inputClassName={classNames(
                popupCls.input,
                popupCls.input_short,
              )}
              placeholder="Телефон"
              required
            />
            <InputWithErrorMessage
              type="email"
              name="email"
              inputClassName={classNames(
                popupCls.input,
                popupCls.input_short,
              )}
              placeholder="Електронна пошта"
              required
            />
            <InputWithErrorMessage
              type="password"
              name="password"
              inputClassName={classNames(
                popupCls.input,
                popupCls.input_short,
              )}
              placeholder="Пароль"
              required
            />
            <InputWithErrorMessage
              type="password"
              name="password_control"
              inputClassName={classNames(
                popupCls.input,
                popupCls.input_short,
              )}
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
            <div className={popupCls.alreadyRegisteredBlock}>
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
          </ValidationForm>
        </div>
      </div>
    </Popup>
  );
});

export default LoginRegisterPopup;
