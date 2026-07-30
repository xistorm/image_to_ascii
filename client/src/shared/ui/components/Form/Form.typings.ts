import type { FormEventHandler, PropsWithChildren } from 'react';

export interface IFormProps extends PropsWithChildren {
    className?: string;
    onSubmit?: FormEventHandler;
}
