import { useFormState } from 'react-hook-form';

import { formSteps } from './constants';

const FormActions = ({ step, onBack = () => {} }) => {
  const { isSubmitting } = useFormState();
  const isFirstStep = step === formSteps.FIRST;
  const isLastStep = step === formSteps.THIRD;
  const submitText = isSubmitting ? 'Submitting...' : 'Submit';

  return (
    <>
      {!isFirstStep && <button onClick={onBack} type="button">Back</button>}
      <button type="submit" disabled={isSubmitting}>
        {isLastStep ? submitText : 'Next'}
      </button>
    </>
  );
};

export default FormActions;
