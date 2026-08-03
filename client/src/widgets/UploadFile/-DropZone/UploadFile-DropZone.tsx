import { type FC } from 'react';
import UploadIcon from '../UploadFile.assets/upload.svg?react';

import styles from './UploadFile-DropZone.module.css';
import type { IUploadFileDropZoneProps } from './UploadFile-DropZone.typings';

import { Input } from '@/shared/ui/components';
import { cn } from '@/shared/utils';

const cnUploadFileDropZone = cn(styles);

export const UploadFileDropZone: FC<IUploadFileDropZoneProps> = ({
    control,
    inputProps,
    restrictions = [],
}) => {
    return (
        <>
            <div className={cnUploadFileDropZone('UploadFileDropZone-Icon')}>
                <UploadIcon/>
            </div>

            <div className={cnUploadFileDropZone('UploadFileDropZone-Info')}>
                <span className={cnUploadFileDropZone('UploadFileDropZone-Title')}>Перетащите фото сюда</span>
                <Input
                    className={cnUploadFileDropZone('UploadFileDropZone-Description')}
                    {...control.register('file')}
                    {...inputProps}
                    type="file"
                    id="file"
                >или выберите файл</Input>
            </div>

            {restrictions.length ?
                <div className={cnUploadFileDropZone('UploadFileDropZone-Meta')}>
                    {restrictions.map((restriction) => (
                        <span key={restriction.id} className={cnUploadFileDropZone('UploadFileDropZone-Restriction')}>
                            {restriction.name}: {restriction.value}
                        </span>
                    ))}
                </div>
                : null
            }
        </>
    );
};
