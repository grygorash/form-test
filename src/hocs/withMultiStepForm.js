import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const withMultiStepForm = (Component, { defaultStep = 0, getFormConfig = () => {} }) => (props) => {
  const [step, setStep] = useState(defaultStep);
  const methods = useForm(getFormConfig(step));

  return (
    <FormProvider {...methods}>
      <Component step={step} setStep={setStep} {...props} />
    </FormProvider>
  );
};

export default withMultiStepForm;
