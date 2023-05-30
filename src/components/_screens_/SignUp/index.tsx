import React from 'react';
import { Button, FormControl, Stack, Text, VStack } from 'native-base';
import { Controller, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { useFormWithSchema } from 'src/hooks/useFormWithSchemaBuilder';
import FormFieldInput from 'src/components/_shared_/FormFields/Input';
import LogoImage from 'src/components/_shared_/FormAssets/LogoImage';
import FormFieldInputPassword from 'src/components/_shared_/FormFields/InputPassword';

export type SignUpScreenCompFormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required('cannot be blank'),
  email: yup.string().required('cannot be blank').email('email must be valid'),
  password: yup.string().required('cannot be blank'),
});

type SignUpScreenCompProps = {
  isLoading?: boolean;
  onSubmit: (data: SignUpScreenCompFormValues) => Promise<void>;
  onSignInClick: () => void;
};

const SignUpScreenComp: React.FC<SignUpScreenCompProps> = ({
  isLoading,
  onSubmit,
  onSignInClick,
}) => {
  const { control, ...methods } = useFormWithSchema(schema, { mode: 'onBlur' });

  const handleSubmit: SubmitHandler<SignUpScreenCompFormValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormProvider control={control} {...methods}>
      <FormControl>
        <VStack
          alignItems="center"
          p="6"
          pt="2"
          bgColor="white"
          space="4"
          borderRadius="md"
        >
          <LogoImage />

          <Text fontSize="2xl" textAlign="center">
            Register Yourself
          </Text>

          <Stack width="full">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormFieldInput
                  placeholder="Name"
                  onChangeText={field.onChange}
                  errorMessage={methods.formState.errors.name?.message}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormFieldInput
                  placeholder="Email"
                  onChangeText={field.onChange}
                  errorMessage={methods.formState.errors.email?.message}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormFieldInputPassword
                  placeholder="Password"
                  onChangeText={field.onChange}
                  errorMessage={methods.formState.errors.password?.message}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Button
              isLoading={isLoading}
              onPress={methods.handleSubmit(handleSubmit)}
            >
              Sign Up
            </Button>

            <Button variant="link" onPress={onSignInClick}>
              Already have an account?
            </Button>
          </Stack>
        </VStack>
      </FormControl>
    </FormProvider>
  );
};

export default SignUpScreenComp;
