import type { IInputProps } from '@/shared/ui/components';
import type { UploadFileSchema, UploadFileSchemaInput } from '@/widgets/UploadFile/UploadFile.model';
import type { Control } from 'react-hook-form';

export interface IUploadFilePreviewProps {
    file: File;
    control: Control<UploadFileSchemaInput, any, UploadFileSchema>;
    inputProps: IInputProps;
}
