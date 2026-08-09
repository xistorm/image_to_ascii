import type { UploadStatus } from '@/entities/upload';

export interface IUploadPreviewProps {
    id: string;
    status: UploadStatus;
    title: string;
    description: string;
    previewUrl: string;
}
