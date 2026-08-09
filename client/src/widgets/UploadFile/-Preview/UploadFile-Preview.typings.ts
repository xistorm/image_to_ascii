import type { Control } from 'react-hook-form';

import type { UploadFileSchema, UploadFileSchemaInput } from '../UploadFile.model';

import type { IInputProps } from '@/shared/components/Input';

export interface IUploadFilePreviewProps {
    file: File;
    control: Control<UploadFileSchemaInput, unknown, UploadFileSchema>;
    inputProps: IInputProps;
}
