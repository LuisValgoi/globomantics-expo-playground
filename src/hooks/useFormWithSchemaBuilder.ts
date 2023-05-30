import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

/**
 * @param schema - A valid you schema
 * @param useFormProps
 * @returns
 */
export function useFormWithSchema<T extends Yup.AnyObjectSchema>(
  schema: T,
  useFormProps?: UseFormProps<Yup.Asserts<T>>
): UseFormReturn<Yup.Asserts<T>> {
  return useForm({ ...useFormProps, resolver: yupResolver(schema) });
}

/**
 * @param schemaBuilder - Should return a validation schema
 * @param useFormProps Do not provide "resolver" value as it will be ignored.
 * @returns
 */
export function useFormWithSchemaBuilder<T extends Yup.AnyObjectSchema>(
  schemaBuilder: (yup: typeof Yup) => T,
  useFormProps?: UseFormProps<Yup.Asserts<T>>
): UseFormReturn<Yup.Asserts<T>> {
  return useForm({
    ...useFormProps,
    resolver: yupResolver(schemaBuilder(Yup)),
  });
}
