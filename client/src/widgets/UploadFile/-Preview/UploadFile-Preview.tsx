import { type FC } from 'react';
import { filesize } from 'filesize';

import styles from './UploadFile-Preview.module.css';
import type { IUploadFilePreviewProps } from './UploadFile-Preview.typings';

import CheckIcon from '@/shared/assets/icons/check.svg?react';
import { cn } from '@/shared/utils';
import { useFilePreview } from '@/shared/hooks';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Image } from '@/shared/components/Image';

const cnUploadFilePreview = cn(styles);

export const UploadFilePreview: FC<IUploadFilePreviewProps> = ({
    file,
    control,
    inputProps,
}) => {
    const preview = useFilePreview({ file });
    const size = filesize(file.size, { standard: 'si' }).toString();

    return (
        <>
            <div className={cnUploadFilePreview('UploadFilePreview-Preview')}>
                <Image
                    className={cnUploadFilePreview('UploadFilePreview-Image')}
                    alt={file.name}
                    src={preview}
                />
            </div>

            <div className={cnUploadFilePreview('UploadFilePreview-Info')}>
                <span className={cnUploadFilePreview('UploadFilePreview-Success')}>
                    <CheckIcon className={cnUploadFilePreview('UploadFilePreview-SuccessIcon')}/>
                    Файл загружен
                </span>
                <span className={cnUploadFilePreview('UploadFilePreview-Name')}>{file.name}</span>
                <span className={cnUploadFilePreview('UploadFilePreview-Size')}>{size}</span>
            </div>

            <div className={cnUploadFilePreview('UploadFilePreview-Controls')}>
                <Button type="submit" text="Конвертировать в ASCII"/>
                <Input
                    {...control.register('file')}
                    {...inputProps}
                    type="file"
                    id="reset_file"
                >
                    <Button as="div" view="ghost" text="Заменить файл"/>
                </Input>
            </div>
        </>
    );
};
