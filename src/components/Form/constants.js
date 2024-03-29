import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FullNameStep from './Steps/FullNameStep';
import EmailPasswordStep from './Steps/EmailPasswordStep';
import PaymentMethodStep from './Steps/PaymentMethodStep';

export const formStyles = { margin: '0 auto', width: 300 };

export const FULL_NAME = 'fullName';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirmPassword';
export const PAYMENT_METHOD = 'paymentMethod';
export const TYPE = 'type';
export const CARD_NUMBER = 'cardNumber';
export const PAYMENT_EMAIL = 'paypalEmail';

export const formSteps = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
};

export const paymentMethodTypes = {
  CC: 'cc',
  PAYPAL: 'pp',
};

const fullNameSchema = yup
  .string()
  .trim()
  .required('Field is required')
  .matches(/.{3,}\s+?.{3,}/, 'Must include first and last names')
  .matches(/^[a-zA-Z\s]*$/, 'Can only contain Latin letters');

const emailSchema = yup
  .string()
  .trim()
  .required('Field is required')
  .email('Must be valid')
  .matches(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, 'Must be valid');

const passwordSchema = yup
  .string()
  .required('Field is required')
  .min(8, 'Minimum 8 characters')
  .matches(/(?=.*\d)/, 'Must contain a number')
  .matches(/(?=.*[A-Z])/, 'Must contain a uppercase letter');

const confirmPasswordSchema = yup
  .string()
  .required('Field is required')
  .oneOf([yup.ref(PASSWORD), null], 'Passwords must match');

const typeSchema = yup.string().required();

const cardNumberSchema = yup
  .string()
  .when([TYPE], {
    is: paymentMethodTypes.CC,
    then: () => yup
      .string()
      .trim()
      .required('Field is required')
      .matches(/^\d*$/, 'Can only contain numbers')
      .min(16, 'Must be exactly 16 digits')
      .max(16, 'Must be exactly 16 digits'),
  });

const paypalEmailSchema = yup
  .string()
  .when([TYPE], {
    is: paymentMethodTypes.PAYPAL,
    then: () => emailSchema,
  });

const formSchemaByStep = {
  [formSteps.FIRST]: {
    [FULL_NAME]: fullNameSchema,
  },
  [formSteps.SECOND]: {
    [EMAIL]: emailSchema,
    [PASSWORD]: passwordSchema,
    [CONFIRM_PASSWORD]: confirmPasswordSchema,
  },
  [formSteps.THIRD]: {
    [PAYMENT_METHOD]: yup.object({
      [TYPE]: typeSchema,
      [CARD_NUMBER]: cardNumberSchema,
      [PAYMENT_EMAIL]: paypalEmailSchema,
    }),
  },
};

const defaultValues = {
  [FULL_NAME]: '',
  [EMAIL]: '',
  [PASSWORD]: '',
  [CONFIRM_PASSWORD]: '',
  [PAYMENT_METHOD]: {
    [TYPE]: paymentMethodTypes.CC,
    [CARD_NUMBER]: undefined,
    [PAYMENT_EMAIL]: undefined,
  },
};

export const getMultiStepFormConfig = (step) => ({
  mode: 'onSubmit',
  resolver: yupResolver(yup.object(formSchemaByStep[step])),
  defaultValues,
});

export const formProps = {
  defaultStep: formSteps.FIRST,
  getFormConfig: getMultiStepFormConfig,
};

export const formStepsComponents = [FullNameStep, EmailPasswordStep, PaymentMethodStep];

export const firstStepFields = [
  {
    name: FULL_NAME,
    label: 'Full Name',
    component: 'input',
    componentProps: {
      type: 'text',
      id: FULL_NAME,
      placeholder: 'Enter your full name',
    },
  },
];

export const secondStepFields = [
  {
    name: EMAIL,
    label: 'Email',
    component: 'input',
    componentProps: {
      type: 'email',
      id: EMAIL,
      placeholder: 'Enter your email',
    },
  },
  {
    name: PASSWORD,
    label: 'Password',
    component: 'input',
    componentProps: {
      type: 'password',
      id: PASSWORD,
      placeholder: 'Enter your password',
    },
  },
  {
    name: CONFIRM_PASSWORD,
    label: 'Confirm Password',
    component: 'input',
    componentProps: {
      type: 'password',
      id: CONFIRM_PASSWORD,
      placeholder: 'Confirm your password',
    },
  },
];

export const thirdStepFields = (isCC) => [
  {
    name: `${PAYMENT_METHOD}.${TYPE}`,
    label: 'Credit Card',
    component: 'input',
    componentProps: {
      type: 'radio',
      id: paymentMethodTypes.CC,
      value: paymentMethodTypes.CC,
      style: { width: 'auto' },
    },
  },
  {
    name: `${PAYMENT_METHOD}.${TYPE}`,
    label: 'PayPal',
    component: 'input',
    componentProps: {
      type: 'radio',
      id: paymentMethodTypes.PAYPAL,
      value: paymentMethodTypes.PAYPAL,
      style: { width: 'auto' },
    },
  },
  isCC
    ? {
      name: `${PAYMENT_METHOD}.${CARD_NUMBER}`,
      label: 'Card Number',
      component: 'input',
      componentProps: {
        type: 'text',
        id: CARD_NUMBER,
        placeholder: 'Enter your card number',
      },
    }
    : {
      name: `${PAYMENT_METHOD}.${PAYMENT_EMAIL}`,
      label: 'PayPal Email',
      component: 'input',
      componentProps: {
        type: 'email',
        id: PAYMENT_EMAIL,
        placeholder: 'Enter your PayPal email',
      },
    },
];

const handleClearEmptyValuesForm = (form) => {
  for (const key in form) {
    if (typeof form[key] === 'object') {
      return handleClearEmptyValuesForm(form[key]);
    }

    if (form[key] === '') {
      delete form[key];
    }
  }
};

export const getFormData = ({ fullName, ...form }) => {
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');

  handleClearEmptyValuesForm(form);

  return { firstName, lastName, ...form };
};
