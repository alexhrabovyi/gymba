/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-regex-literals, no-control-regex, no-useless-escape */
import {
  ReactNode,
  memo, useEffect, useRef, useState,
} from 'react';
import { Form } from 'react-router-dom';
import ValidationError from '../../../utils/ValidationError';

interface ValidationFormProps {
  className: string,
  children: ReactNode[],
}

const ValidationForm = memo<ValidationFormProps>(({ className, children }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [inputs, setInputs] = useState<HTMLInputElement[]>([]);
  const [textareas, setTextareas] = useState<HTMLTextAreaElement[]>([]);

  function markInvalid(input: HTMLInputElement | HTMLTextAreaElement, errorMessage: string) {
    if (!input.parentElement) return;

    input.parentElement.dataset.errorMessage = errorMessage;
    input.style.backgroundColor = 'rgb(250 209 206)';
    input.focus();

    input.addEventListener('input', () => {
      input.style.backgroundColor = '';
      input.parentElement?.removeAttribute('data-error-message');
    }, { once: true });
  }

  function addTelMask(input: HTMLInputElement) {
    if (!input) return;

    function createTel(str: string) {
      let tel = str.replace(/\d{1,2}/, '+38($&');
      tel = tel.replace(/(?<=\+38\(\d\d)\d(?=\d)/, '$&)');
      tel = tel.replace(/(?<=\))\d{3}(?=\d)/, '$&-');
      tel = tel.replace(/(?<=-)\d{2}(?=\d)/, '$&-');
      return tel;
    }

    input.addEventListener('focusin', (e) => {
      const targetInput = e.target as HTMLInputElement;

      if (targetInput.value.length < 3) {
        targetInput.value = '+38';
      }
    }, { once: true, passive: true });

    input.addEventListener('input', (e) => {
      const targetInput = e.target as HTMLInputElement;

      if (targetInput.value.length < 3) {
        targetInput.value = '+38';
      }

      targetInput.value = targetInput.value.replace(/(?<=\+38)[^0]/, '');
      targetInput.value = targetInput.value.replace(/(?<=[\d-()+])\D/, '');

      if (targetInput.value.length > 3) {
        const nums = targetInput.value.slice(3, 15).match(/\d/g)!.join('');

        targetInput.value = createTel(nums);
      }
    }, { passive: true });

    input.addEventListener('paste', (e) => {
      e.preventDefault();

      const targetInput = e.target as HTMLInputElement;

      let paste = (e.clipboardData)?.getData('text') || '';

      if (paste.match(/\D/g)) return;

      if (paste.startsWith('38')) {
        paste = paste.slice(2);
      }

      if (paste[0] !== '0') {
        paste = `0${paste}`;
      }

      targetInput.value = createTel(paste);
    });
  }

  type ValidateFunc = (input: HTMLInputElement | HTMLTextAreaElement) => boolean;

  const validateEmail: ValidateFunc = (input) => {
    const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    return regex.test(input.value);
  };

  const validateName: ValidateFunc = (input) => {
    const regex = new RegExp('^[а-яa-z]{2,}(\\s[а-яa-z]{2,})*$', 'i');
    return regex.test(input.value);
  };

  const validateFullname: ValidateFunc = (input) => {
    const regex = new RegExp('^[а-яa-z]{2,}(\\s[а-яa-z]{2,}){2}$', 'i');
    return regex.test(input.value);
  };

  const validatePassword: ValidateFunc = (input) => {
    const regex = new RegExp('\\s');

    return !regex.test(input.value) && input.value.length > 7;
  };

  const validatePasswordControl: ValidateFunc = (input) => {
    const originalPasswordInputValue = formRef.current?.querySelector<HTMLInputElement>('[name="password"]')?.value;

    return input.value === originalPasswordInputValue;
  };

  const validateTel: ValidateFunc = (input) => input.value.length === 17;

  const validateTextarea: ValidateFunc = (textarea) => textarea.value.length > 5;

  function validate(formData: FormData) {
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
          } else if (input.name === 'fullname') {
            if (!validateFullname(input)) {
              markInvalid(input, 'Некоректне ПІБ');
              throw new ValidationError('Некоректне ПІБ');
            }
          }

          formData.append(input.name, input.value);
          break;
        }
        case 'password': {
          if (input.name === 'password') {
            if (!validatePassword(input)) {
              markInvalid(input, 'Некоректний пароль');
              throw new ValidationError('Некоректний пароль');
            }
          } else if (input.name === 'password_control') {
            if (!validatePasswordControl(input)) {
              markInvalid(input, 'Некоректний пароль');
              throw new ValidationError('Некоректний пароль');
            }
          }

          formData.append(input.name, input.value);
          break;
        }
        case 'tel': {
          if (!validateTel(input)) {
            markInvalid(input, 'Некоректний номер');
            throw new ValidationError('Некоректний номер');
          }

          formData.append(input.name, input.value);
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
    setInputs(Array.from(formRef.current!.querySelectorAll('input')));
  }, []);

  useEffect(() => {
    setTextareas(Array.from(formRef.current!.querySelectorAll('textarea')));
  }, []);

  useEffect(() => {
    addTelMask(formRef.current!.querySelector('input[type="tel"]') as HTMLInputElement);
  }, []);

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData();

    try {
      validate(formData);
    } catch (err) {
      event.preventDefault();
      console.error(err);
    }
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
