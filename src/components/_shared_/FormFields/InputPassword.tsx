import React, { useMemo, useState } from 'react';
import FormFieldInput, { FormFieldInputProps } from './Input';
import { Icon, Pressable } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const FormFieldInputPassword: React.FC<FormFieldInputProps> = ({ ...rest }) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const handlePasswordShownPress = () => {
    setPasswordShown((prev) => !prev);
  };

  const passwordIcon = useMemo(() => {
    return passwordShown ? 'eye-slash' : 'eye';
  }, [passwordShown]);

  return (
    <FormFieldInput
      {...rest}
      type={passwordShown ? 'text' : 'password'}
      placeholder="Password"
      InputRightElement={
        <Pressable padding="2" onPress={handlePasswordShownPress}>
          <Icon as={FontAwesome} name={passwordIcon} />
        </Pressable>
      }
    />
  );
};

export default FormFieldInputPassword;
