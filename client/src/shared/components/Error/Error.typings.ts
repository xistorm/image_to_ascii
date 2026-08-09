import type { FieldErrors } from 'react-hook-form';

export interface IErrorProps {
    className?: string;
    name: string;
    errors?: FieldErrors;
}
