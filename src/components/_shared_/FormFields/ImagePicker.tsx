import { FormControl, IInputProps, WarningOutlineIcon } from 'native-base';
import React from 'react';
import ImagePicker from '../ImagePicker';
import { UseFormSetError, UseFormSetValue } from 'react-hook-form';

export type FormFieldImagePickerProps = {
  controllerName: string;
  imageName?: string;
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  errorMessage?: string;
} & IInputProps;

const FormFieldImagePicker: React.FC<FormFieldImagePickerProps> = ({
  controllerName,
  imageName,
  errorMessage = null,
  isInvalid,
  setValue,
  setError,
  ...rest
}) => {
  const invalid = !!errorMessage || isInvalid;

  const handlePickImage = async (imgURI: string | undefined) => {
    const config = {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    };
    if (imgURI) {
      setValue(controllerName, imgURI, config);
      setError(controllerName, {});
    } else {
      setValue(controllerName, undefined, config);
      setError('image', { message: errorMessage! }, { shouldFocus: true });
    }
  };

  return (
    <FormControl isInvalid={invalid}>
      <ImagePicker
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
        onPickImage={handlePickImage}
        imageName={imageName}
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

export default FormFieldImagePicker;
