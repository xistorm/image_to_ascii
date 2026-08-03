import type { FC } from 'react';

import styles from './Create.module.css';

import { UploadFile } from '@/widgets/UploadFile';
import { cn } from '@/shared/utils';

const cnCreate = cn(styles);

export const Create: FC = () => {
    return (
        <div className={cnCreate('Create')}>
            <span className={cnCreate('Create-Title')}>ASCII-конвертация</span>
            <span className={cnCreate('Create-Description')}>Загрузите фото — мы конвертируем его в ASCII-арт с точностью до символа.</span>

            <div className={cnCreate('Create-Content')}>
                <UploadFile
                    accept={{ 'image/*': [] }}
                    maxSize={4 * 8 * 1024 * 1024}
                />
            </div>
        </div>
    );
};
