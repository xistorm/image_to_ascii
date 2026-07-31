import type { FieldErrors } from 'react-hook-form';

export interface IInputErrorProps {
    name: string;
    errors: FieldErrors | undefined;
}
