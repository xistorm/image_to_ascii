import { cn } from '@/shared/utils';
import type { FC } from 'react';

import styles from './Form.module.css';
import type { IFormProps } from './Form.typings';

const cnForm = cn(styles);

export const Form: FC<IFormProps> = ({
    className,
    onSubmit,
    children,
}) => {
    return (
        <form
            className={cnForm('Form', [className])}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};
