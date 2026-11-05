import type { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { UploadFileSchema, UploadFileSchemaInput } from '../UploadFile.model';

export interface IUploadFileSettingsProps {
    control: Control<UploadFileSchemaInput, unknown, UploadFileSchema>;
    watch: UseFormWatch<UploadFileSchemaInput>;
    setValue: UseFormSetValue<UploadFileSchemaInput>;
}
