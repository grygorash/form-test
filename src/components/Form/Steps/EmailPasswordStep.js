import { memo } from 'react';

import FormField from '../../FormField/FormField';
import { secondStepFields } from '../../Form/constants';

const EmailPasswordStep = () => secondStepFields.map((field, key) => <FormField key={key} {...field} />);

export default memo(EmailPasswordStep);
