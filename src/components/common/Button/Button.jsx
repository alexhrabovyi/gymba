/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import buttonCls from './Button.module.scss';

export default function Button({
  className, type, children, id, onClick, ariaHidden = false,
}) {
  const buttonType = type || 'button';

  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={classNames(className, buttonCls.button)}
      id={id}
      aria-hidden={ariaHidden}
    >
      {children}
    </button>
  );
}
