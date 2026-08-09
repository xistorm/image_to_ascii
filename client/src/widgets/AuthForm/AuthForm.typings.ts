import type { IFormProps } from '@/shared/components/Form';

export interface IAuthFormRedirectProps {
    description: string;
    text: string;
    to: string;
}

export interface IAuthFormProps extends IFormProps {
    title: string;
    description: string;
    redirect: IAuthFormRedirectProps;
}
