import {
  FormControl,
  IInputProps,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

export type FormFieldInputProps = {
  errorMessage?: string;
} & IInputProps;

const FormFieldInput: React.FC<FormFieldInputProps> = ({
  errorMessage = null,
  isInvalid,
  placeholder,
  ...rest
}) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <Input
        autoCapitalize='none'
        placeholder={`Enter ${placeholder}...`}
        _focus={{
          bgColor: 'gray.100',
          borderWidth: 1,
          borderColor: 'gray.400',
        }}
        _invalid={{
          bgColor: 'red.100',
          borderWidth: 2,
          borderColor: 'red.500',
        }}
        {...rest}
      />
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default FormFieldInput;
