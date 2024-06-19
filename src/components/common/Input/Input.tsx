import classNames from 'classnames';
import inputCls from './Input.module.scss';

interface InputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'],
  name: React.InputHTMLAttributes<HTMLInputElement>['name'],
  className: string | string[],
  placeholder: React.InputHTMLAttributes<HTMLInputElement>['placeholder'],
  id: React.InputHTMLAttributes<HTMLInputElement>['id'],
  required: React.InputHTMLAttributes<HTMLInputElement>['required'],
}

const Input: React.FC<InputProps> = ({
  type = 'text', name, className, placeholder, id, required,
}) => (
  <input
    type={type}
    name={name}
    className={classNames(inputCls.input, className)}
    placeholder={placeholder}
    id={id}
    required={required}
    aria-required={required}
  />
);

export default Input;
