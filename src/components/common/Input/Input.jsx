import classNames from 'classnames';
import inputCls from './Input.module.scss';

export default function Input({ className, placeholder }) {
  return (
    <input className={classNames(className, inputCls.input)} placeholder={placeholder} />
  );
}
