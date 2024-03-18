/* eslint-disable react/button-has-type */
import { forwardRef } from 'react';
import classNames from 'classnames';
import buttonCls from './Button.module.scss';

const Button = forwardRef(({
  className, type, children, id, onClick, ariaHidden = false, ariaLabel,
}, ref) => {
  const buttonType = type || 'button';

  return (
    <button
      ref={ref}
      type={buttonType}
      className={classNames(className, buttonCls.button)}
      id={id}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
