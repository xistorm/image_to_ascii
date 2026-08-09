import type { FormHTMLAttributes, Ref } from 'react';
import type { FieldErrors } from 'react-hook-form';

export interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
    ref?: Ref<HTMLFormElement | null>;
    errors?: FieldErrors;
}
