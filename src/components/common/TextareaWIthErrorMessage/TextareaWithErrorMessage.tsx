import { memo } from 'react';
import classNames from 'classnames';
import Textarea from '../Textarea/Textarea';
import textareaCls from './TextareaWithErrorMessage.module.scss';

interface TextAreaWithErrorMessageProps {
  name: string,
  textareaBlockClassName: string,
  textareaClassName: string,
  placeholder: string,
  id?: string,
  required: boolean,
  textareaType: string,
}

const TextAreaWithErrorMessage = memo<TextAreaWithErrorMessageProps>(({
  name, textareaBlockClassName, textareaClassName, placeholder, id, required, textareaType,
}) => (
  <div
    className={classNames(
      textareaCls.textareaBlock,
      textareaBlockClassName,
    )}
  >
    <Textarea
      name={name}
      className={[textareaCls.textarea, textareaClassName]}
      placeholder={placeholder}
      id={id}
      required={required}
      textareaType={textareaType}
    />
  </div>
));

export default TextAreaWithErrorMessage;
