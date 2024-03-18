import { memo } from 'react';
import classNames from 'classnames';
import Textarea from '../Textarea/Textarea.jsx';
import textareaCls from './TextareaWithErrorMessage.module.scss';

const TextAreaWithErrorMessage = memo(({
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
