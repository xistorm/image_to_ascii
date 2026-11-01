import type { FileKind, FileTheme, UploadImage } from '@/entities/upload/model';

export const findUploadImage = (
    images: UploadImage[],
    kind: FileKind,
    theme: FileTheme,
): UploadImage | undefined => {
    return images.find((image) => (
        image.kind === kind &&
        image.theme === theme
    ));
};
