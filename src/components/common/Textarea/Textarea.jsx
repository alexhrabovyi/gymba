import { memo } from 'react';
import classNames from 'classnames';
import textareaCls from './Textarea.module.scss';

const Textarea = memo(({
  name, className, placeholder, id, required, textareaType,
}) => (
  <textarea
    name={name}
    className={classNames(textareaCls.textarea, className)}
    placeholder={placeholder}
    id={id}
    required={required}
    data-textarea-type={textareaType}
  />
));

export default Textarea;
