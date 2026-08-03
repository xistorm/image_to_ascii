import type { UploadStatus } from '@/features/UploadPreview';

export const getUploadStatus = (status: UploadStatus): string => {
    switch (status) {
        case 'pending':
            return 'Конвертация...';
        case 'success':
            return 'ASCII готов';
        case 'error':
            return 'Ошибка';
    }
};
