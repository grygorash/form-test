import { memo } from 'react';
import { useWatch } from 'react-hook-form';

import FormField from '../../FormField/FormField';
import { PAYMENT_METHOD, paymentMethodTypes, thirdStepFields, TYPE } from '../../Form/constants';

const PaymentMethodStep = () => {
  const type = useWatch({ name: `${PAYMENT_METHOD}.${TYPE}` });
  const isCC = type === paymentMethodTypes.CC;
  const inputFields = (() => thirdStepFields(isCC))();

  return inputFields.map((field, key) => <FormField key={key} {...field} />);
};

export default memo(PaymentMethodStep);
