import { get, useFormState } from 'react-hook-form';

const withFormFieldError = (Component) => (props) => {
  const { errors } = useFormState();
  const errorMessage = get(errors, props.name)?.message;

  return (
    <>
      <Component {...props} />
      {errorMessage ? <p>{errorMessage}</p> : <><br /><br /></>}
    </>
  );
};

export default withFormFieldError;
