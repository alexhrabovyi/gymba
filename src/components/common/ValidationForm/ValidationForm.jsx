/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-regex-literals, no-control-regex, no-useless-escape */
import {
  memo, useEffect, useRef, useState,
} from 'react';
import { Form } from 'react-router-dom';
import ValidationError from '../../../utils/ValidationError.js';

const ValidationForm = memo(({ className, children }) => {
  const formRef = useRef(null);
  const [inputs, setInputs] = useState([]);
  const [textareas, setTextareas] = useState([]);

  function markInvalid(input, errorMessage) {
    input.parentElement.dataset.errorMessage = errorMessage;
    input.style.backgroundColor = 'rgb(250 209 206)';
    input.focus();

    input.addEventListener('input', () => {
      input.style.backgroundColor = '';
      input.parentElement.removeAttribute('data-error-message');
    }, { once: true });
  }

  function validateEmail(input) {
    const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    return regex.test(input.value);
  }

  function validateName(input) {
    const regex = new RegExp('^[а-яa-z]{2,}(\\s[а-яa-z]{2,})*$', 'i');
    return regex.test(input.value);
  }

  function validateTextarea(textarea) {
    return textarea.value.length > 5;
  }

  function validate(formData) {
    inputs.forEach((input) => {
      switch (input.type) {
        case 'email': {
          if (!validateEmail(input)) {
            markInvalid(input, 'Некоректний email');
            throw new ValidationError('Некоректний email');
          }
          formData.append(input.name, input.value);
          break;
        }
        case 'text': {
          if (input.name === 'name') {
            if (!validateName(input)) {
              markInvalid(input, 'Некоректне ім\'я');
              throw new ValidationError('Некоректне ім\'я');
            }

            formData.append(input.name, input.value);
          }
          break;
        }
        default: {
          formData.append(input.name, input.value);
        }
      }
    });

    textareas.forEach((textarea) => {
      switch (textarea.dataset.textareaType) {
        case 'comment': {
          if (!validateTextarea(textarea)) {
            markInvalid(textarea, 'Некоректний коментар');
            throw new ValidationError('Некоректний коментар');
          }

          formData.append(textarea.name, textarea.value);
          break;
        }
        case 'question': {
          if (!validateTextarea(textarea)) {
            markInvalid(textarea, 'Некоректне запитання');
            throw new ValidationError('Некоректне запитання');
          }

          formData.append(textarea.name, textarea.value);
          break;
        }
        default: {
          formData.append(textarea.name, textarea.value);
        }
      }
    });
  }

  useEffect(() => {
    setInputs(Array.from(formRef.current.querySelectorAll('input')));
  }, []);

  useEffect(() => {
    setTextareas(Array.from(formRef.current.querySelectorAll('textarea')));
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
