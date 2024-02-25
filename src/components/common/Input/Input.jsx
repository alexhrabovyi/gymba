import classNames from 'classnames';
import inputCls from './Input.module.scss';

export default function Input({
  type, name, className, placeholder, id, required,
}) {
  const inputType = type || 'text';

  return (
    <input
      type={inputType}
      name={name}
      className={classNames(inputCls.input, className)}
      placeholder={placeholder}
      id={id}
      required={required}
    />
  );
}
