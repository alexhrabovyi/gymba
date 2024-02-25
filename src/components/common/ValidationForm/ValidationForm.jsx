/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-regex-literals, no-control-regex, no-useless-escape */
import {
  memo, useEffect, useRef, useState,
} from 'react';
import { Form } from 'react-router-dom';
import ValidationError from '../../../utils/ValidationError.js';
import validationFormCls from './ValidationForm.module.scss';

const ValidationForm = memo(({ className, errorClassName = validationFormCls.error, children }) => {
  const formRef = useRef(null);
  const [inputs, setInputs] = useState([]);

  function validateEmail(input) {
    const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    return regex.test(input.value);
  }

  function validate(formData) {
    inputs.forEach((input) => {
      switch (input.type) {
        case 'email': {
          if (!validateEmail(input)) {
            input.parentElement.dataset.errorMessage = 'Некорректный email';
            input.classList.add(errorClassName);
            input.focus();

            input.addEventListener('input', () => {
              input.classList.remove(errorClassName);
              input.parentElement.removeAttribute('data-error-message');
            }, { once: true });

            throw new ValidationError('Некорректный email');
          }
          formData.append(input.name, input.value);
          break;
        }
        default: {
          formData.append(input.name, input.value);
        }
      }
    });
  }

  useEffect(() => {
    setInputs(Array.from(formRef.current.querySelectorAll('input')));
  }, []);

  function onSubmitHandler() {
    const formData = new FormData();

    try {
      validate(formData);
    } catch (e) {
      console.error(e);
    }

    formData.entries().forEach(([name, value]) => {
      console.log(`${name}: ${value}`);
    });
  }

  return (
    <Form
      ref={formRef}
      className={className}
      onSubmit={onSubmitHandler}
      noValidate
    >
      {children}
    </Form>
  );
});

export default ValidationForm;
