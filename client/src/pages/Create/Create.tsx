import { cn } from '@/shared/utils';
import type { FC } from 'react';

import styles from './Create.module.css';

const cnCreate = cn(styles);

export const Create: FC = () => {
    return (
        <div className={cnCreate('Create')}>
            <span className={cnCreate('Create-Title')}>ASCII-конвертация</span>
            <span className={cnCreate('Create-Description')}>Загрузите фото — мы конвертируем его в ASCII-арт с точностью до символа.</span>
        </div>
    );
};
