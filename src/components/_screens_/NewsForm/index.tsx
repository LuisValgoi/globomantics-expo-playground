import React, { useMemo } from 'react';
import { Button, FormControl, Stack, Text, VStack } from 'native-base';
import { Controller, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { useFormWithSchema } from 'src/hooks/useFormWithSchemaBuilder';
import FormFieldInput from 'src/components/_shared_/FormFields/Input';
import { INews } from 'src/interfaces/interfaces';
import FormFieldImagePicker from 'src/components/_shared_/FormFields/ImagePicker';

export type NewsFormScreenCompFormValues = {
  title: string;
  description: string;
  image: string;
};

const schema = yup.object().shape({
  title: yup.string().required('cannot be blank'),
  description: yup.string().required('cannot be blank'),
  image: yup.string().required('cannot be blank'),
});

type NewsFormScreenCompProps = {
  loading?: boolean;
  newsDetail?: INews;
  onSubmit: (data: NewsFormScreenCompFormValues) => Promise<void>;
};

const NewsFormScreenComp: React.FC<NewsFormScreenCompProps> = ({
  loading,
  onSubmit,
  newsDetail,
}) => {
  const { control, ...methods } = useFormWithSchema(schema, {
    mode: 'onTouched',
    defaultValues: {
      title: newsDetail?.title,
      description: newsDetail?.description,
      image: newsDetail?.imagePath,
    },
  });

  const disabled = useMemo(() => {
    return Object.values(methods.getValues()).filter((v) => v).length < 3;
  }, [methods]);

  const handleSubmit: SubmitHandler<NewsFormScreenCompFormValues> = async (form) => {
    await onSubmit(form);
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
          <Text fontSize="2xl" textAlign="center">
            {newsDetail ? `Editing ${newsDetail.title}` : 'Create News'}
          </Text>

          <Stack width="full">
            <Controller
              control={control}
              name="title"
              render={({ field, formState }) => (
                <FormFieldInput
                  placeholder="Title"
                  defaultValue={formState.defaultValues?.title}
                  onChangeText={field.onChange}
                  errorMessage={methods.formState.errors.title?.message}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Controller
              control={control}
              name="description"
              render={({ field, formState }) => (
                <FormFieldInput
                  placeholder="Description"
                  defaultValue={formState.defaultValues?.description}
                  onChangeText={field.onChange}
                  errorMessage={methods.formState.errors.description?.message}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Controller
              control={control}
              name="image"
              render={({ formState }) => (
                <FormFieldImagePicker
                  controllerName="image"
                  imageName={newsDetail?.imageName}
                  placeholder="Select Image"
                  defaultValue={formState.defaultValues?.image}
                  errorMessage={methods.formState.errors.image?.message}
                  setValue={methods.setValue}
                  setError={methods.setError}
                />
              )}
            />
          </Stack>

          <Stack width="full">
            <Button
              isLoading={loading}
              isDisabled={disabled}
              onPress={methods.handleSubmit(handleSubmit)}
            >
              {newsDetail ? "Save" : "Create"}
            </Button>
          </Stack>
        </VStack>
      </FormControl>
    </FormProvider>
  );
};

export default NewsFormScreenComp;
