import type { PropsWithChildren } from 'react';
import type { Control } from 'react-hook-form';

import type { UploadFileSchema, UploadFileSchemaInput } from '../UploadFile.model';

import type { IInputProps } from '@/shared/ui/components';

interface IUploadFileDropZoneRestrictionProps {
    id: string;
    name: string;
    value: string;
}

export interface IUploadFileDropZoneProps extends PropsWithChildren {
    control: Control<UploadFileSchemaInput, unknown, UploadFileSchema>,
    inputProps: IInputProps,
    restrictions?: IUploadFileDropZoneRestrictionProps[];
}
