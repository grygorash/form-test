import { memo } from 'react';

import { formStepsComponents } from './constants';

const FormHeader = ({ step }) =>
  <>
    <h2>Form</h2>
    <p>Step: {step + 1}/{formStepsComponents.length}</p>
  </>;

export default memo(FormHeader);
