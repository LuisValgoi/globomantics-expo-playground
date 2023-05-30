import {
  FormControl,
  Checkbox,
  WarningOutlineIcon,
  ICheckboxProps,
  Text,
} from 'native-base';
import React from 'react';

export type FormFieldCheckboxProps = {
  errorMessage?: string;
  label: string;
} & ICheckboxProps;

const FormFieldCheckbox: React.FC<FormFieldCheckboxProps> = ({
  errorMessage = null,
  isInvalid,
  label,
  ...rest
}) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <Checkbox fontSize="sm" {...rest}>
        <Text>{label}</Text>
      </Checkbox>
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default FormFieldCheckbox;
