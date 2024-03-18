import { memo } from 'react';
import classNames from 'classnames';
import Input from '../Input/Input.jsx';
import inputCls from './InputWithErrorMessage.module.scss';

const InputWithErrorMessage = memo(({
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
