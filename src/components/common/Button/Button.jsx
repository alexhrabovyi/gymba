import classNames from 'classnames';
import buttonCls from './Button.module.scss';

export default function Button({ className, type, children }) {
  const buttonType = type && 'button';

  return (
    <button type={buttonType} className={classNames(className, buttonCls.button)}>
      {children}
    </button>
  );
}
