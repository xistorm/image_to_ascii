export interface IAuthFormRedirectProps {
    description: string;
    text: string;
    to: string;
}

export interface IAuthFormProps {
    title: string;
    description: string;
    redirect: IAuthFormRedirectProps;
}
