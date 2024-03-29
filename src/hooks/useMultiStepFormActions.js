import { useFormContext } from 'react-hook-form';
import { formSteps, getFormData } from '../components/Form/constants';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useMultiStepFormActions = ({ step = 0, setStep = () => {}, lastStep = 0 }) => {
  const { reset } = useFormContext();
  const isLastStep = step === lastStep;

  const handleNext = () => setStep(Math.min(step + 1, lastStep));

  const handleBack = () => setStep(Math.max(step - 1, 0));

  const handleFormSubmit = async(form) => {
    const data = getFormData(form);

    console.log('Form:', data);
    reset();
    setStep(formSteps.FIRST);
  };

  const handleValidate = async(form) => {
    if (isLastStep) {
      await sleep(1000);

      handleFormSubmit(form);
    } else {
      handleNext();
    }
  };

  return { handleBack, handleValidate };
};

export default useMultiStepFormActions;
