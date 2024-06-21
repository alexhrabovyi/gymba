import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Popup from '../Popup/Popup';
import ValidationForm from '../ValidationForm/ValidationForm';
import InputWithErrorMessage from '../InputWithErrorMessage/InputWithErrorMessage';
import TextAreaWithErrorMessage from '../TextareaWIthErrorMessage/TextareaWithErrorMessage';
import Button from '../Button/Button';
import textCls from '../../../scss/_text.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import popupCls from './AskQuestionPopup.module.scss';

interface AskQuestionPopupProps {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  openButtonRef: React.MutableRefObject<HTMLButtonElement | null>,
}

const AskQuestionPopup = memo<AskQuestionPopupProps>(({ isActive, setIsActive, openButtonRef }) => (
  <Popup
    isActive={isActive}
    setIsActive={setIsActive}
    label="Вікно задати питання"
    openButton={openButtonRef?.current}
  >
    <p
      className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text36px,
        popupCls.popupTitle,
      )}
    >
      Задати питання
    </p>
    <ValidationForm
      className={popupCls.popupForm}
    >
      <InputWithErrorMessage
        type="text"
        name="name"
        inputClassName={popupCls.input}
        placeholder="Ім'я"
        required
      />
      <InputWithErrorMessage
        type="email"
        name="email"
        inputClassName={popupCls.input}
        placeholder="Електронна пошта"
        required
      />
      <TextAreaWithErrorMessage
        name="comment"
        textareaBlockClassName={popupCls.textareaBlock}
        textareaClassName={popupCls.textarea}
        placeholder="Напишіть ваше запитання щодо товару"
        required
        textareaType="question"
      />
      <div className={popupCls.submitAndTermsBlock}>
        <Button
          type="submit"
          className={popupCls.submitButton}
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
            to="/terms"
            aria-label="Умови обробки персональних даних"
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
));

export default AskQuestionPopup;
