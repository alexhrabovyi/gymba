import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Popup from '../Popup/Popup.jsx';
import ValidationForm from '../ValidationForm/ValidationForm.jsx';
import InputWithErrorMessage from '../InputWithErrorMessage/InputWithErrorMessage.jsx';
import TextAreaWithErrorMessage from '../TextareaWIthErrorMessage/TextareaWithErrorMessage.jsx';
import Button from '../Button/Button.jsx';
import textCls from '../../../scss/_text.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import popupCls from './AskQuestionPopup.module.scss';

const AskQuestionPopup = memo(({ isActive, setIsActive, openButtonRef }) => (
  <Popup
    isActive={isActive}
    setIsActive={setIsActive}
    label="Вікно задати питання"
    openButton={openButtonRef.current}
  >
    <p
      className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text36px,
        popupCls.popupTitle,
      )}
    >
      Задать вопрос
    </p>
    <ValidationForm
      className={popupCls.popupForm}
    >
      <InputWithErrorMessage
        type="text"
        name="name"
        inputClassName={popupCls.input}
        placeholder="Имя"
        required
      />
      <InputWithErrorMessage
        type="email"
        name="email"
        inputClassName={popupCls.input}
        placeholder="Электронная почта"
        required
      />
      <TextAreaWithErrorMessage
        name="comment"
        textareaBlockClassName={popupCls.textareaBlock}
        textareaClassName={popupCls.textarea}
        placeholder="Напишите ваш вопрос по товару"
        required
        textareaType="question"
      />
      <div className={popupCls.submitAndTermsBlock}>
        <Button
          type="submit"
          className={popupCls.submitButton}
        >
          Отправить
        </Button>
        <p className={classNames(
          textCls.text,
          textCls.text14px,
          textCls.textBlack,
        )}
        >
          Отправляя сообщение вы даете согласие на обработку&nbsp;
          <Link
            to="terms"
            alt="Условия обработки персональных данных"
            className={classNames(
              linkCls.link,
              linkCls.link14px,
              linkCls.linkBlue,
            )}
          >
            персональных данных
          </Link>
        </p>
      </div>
    </ValidationForm>
  </Popup>
));

export default AskQuestionPopup;
