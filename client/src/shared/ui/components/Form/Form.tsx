import { cn, noop } from '@/shared/utils';
import { type FieldValues } from 'react-hook-form';

import styles from './Form.module.css';
import type { IFormProps } from './Form.typings';

const cnForm = cn(styles);

export const Form = <TSchema extends FieldValues = FieldValues, >({
    className,
    form,
    children,
    onSubmit = noop,
    onError = noop,
    ...rest
}: IFormProps<TSchema>) => {
    const { handleSubmit } = form;

    return (
        <form
            className={cnForm('Form', [className])}
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
            {...rest}
        >
            {children}
        </form>
    );
};
