import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import withFormFieldError from '../../hocs/withFormFieldError';

const FormField = ({ component: Component, componentProps, label, name }) => {
  const { register } = useFormContext();

  return (
    <label htmlFor={componentProps.id}>
      {label}
      <Component style={{ width: '100%' }} {...register(name)} {...componentProps} />
    </label>
  );
};

export default withFormFieldError(memo(FormField));
