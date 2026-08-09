import type { IFormProps } from '@/shared/components/Form';
import type { ILinkProps } from '@/shared/components/Link';

export interface IAuthFormRedirectProps extends ILinkProps {
    description: string;
    text: string;
}

export interface IAuthFormProps extends IFormProps {
    title: string;
    description: string;
    redirect: IAuthFormRedirectProps;
}
