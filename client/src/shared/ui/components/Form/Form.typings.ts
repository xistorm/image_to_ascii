import type { PropsWithChildren } from 'react';
import type { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface IFormProps<TSchema extends FieldValues = FieldValues> extends PropsWithChildren {
    className?: string;
    form: UseFormReturn<TSchema>;
    onSubmit?: SubmitHandler<TSchema>;
    onError?: SubmitErrorHandler<TSchema>;
}
