import { memo } from 'react';

import FormField from '../../FormField/FormField';
import { firstStepFields } from '../../Form/constants';

const FullNameStep = () => firstStepFields.map((field, key) => <FormField key={key} {...field} />);

export default memo(FullNameStep);
