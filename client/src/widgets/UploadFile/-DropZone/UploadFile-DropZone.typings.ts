import type { IInputProps } from '@/shared/ui/components';
import type { UploadFileSchema, UploadFileSchemaInput } from '@/widgets/UploadFile/UploadFile.model';
import type { PropsWithChildren } from 'react';
import type { Control } from 'react-hook-form';

interface IUploadFileDropZoneRestrictionProps {
    id: string;
    name: string;
    value: string;
}

export interface IUploadFileDropZoneProps extends PropsWithChildren {
    control: Control<UploadFileSchemaInput, any, UploadFileSchema>,
    inputProps: IInputProps,
    restrictions?: IUploadFileDropZoneRestrictionProps[];
}
