import { memo } from 'react';
import classNames from 'classnames';
import Input from '../Input/Input';
import inputCls from './InputWithErrorMessage.module.scss';

interface InputWithErrorMessageProps {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'],
  name: React.InputHTMLAttributes<HTMLInputElement>['name'],
  inputBlockClassName?: string,
  inputClassName: string,
  placeholder: React.InputHTMLAttributes<HTMLInputElement>['placeholder'],
  id?: React.InputHTMLAttributes<HTMLInputElement>['id'],
  required: React.InputHTMLAttributes<HTMLInputElement>['required'],
}

const InputWithErrorMessage = memo<InputWithErrorMessageProps>(({
  type, name, inputBlockClassName, inputClassName, placeholder, id, required,
}) => (
  <div
    className={classNames(
      inputCls.inputBlock,
      inputBlockClassName,
    )}
  >
    <Input
      type={type}
      name={name}
      className={[inputCls.input, inputClassName]}
      placeholder={placeholder}
      id={id}
      required={required}
    />
  </div>
));

export default InputWithErrorMessage;
