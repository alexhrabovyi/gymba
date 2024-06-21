import { memo } from 'react';
import classNames from 'classnames';
import textareaCls from './Textarea.module.scss';

interface TextareaProps {
  name: string,
  className: string | string[],
  placeholder: string
  id?: string,
  required: boolean,
  textareaType: string,
}

const Textarea = memo<TextareaProps>(({
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
