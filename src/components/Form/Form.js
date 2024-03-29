import { useFormContext } from 'react-hook-form';

import FormHeader from './FormHeader';
import FormActions from './FormActions';
import withMultiStepForm from '../../hocs/withMultiStepForm';
import useMultiStepFormActions from '../../hooks/useMultiStepFormActions';
import { formProps, formSteps, formStepsComponents, formStyles } from './constants';

const Form = ({ step = formSteps.FIRST, setStep = () => {} }) => {
  const { handleSubmit } = useFormContext();
  const lastStep = formSteps.THIRD;
  const FormStep = formStepsComponents[step];

  const {
    handleValidate,
    handleBack,
  } = useMultiStepFormActions({ step, setStep, lastStep });

  return (
    <form noValidate style={formStyles} onSubmit={handleSubmit(handleValidate)}>
      <FormHeader step={step} />
      <FormStep />
      <FormActions step={step} onBack={handleBack} />
    </form>
  );
};

export default withMultiStepForm(Form, formProps);
