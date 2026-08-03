export type UploadStatus = 'pending' | 'success' | 'error';

export interface IUploadPreviewProps {
    id: string;
    status: UploadStatus;
    title: string;
    description: string;
    previewUrl: string;
}
