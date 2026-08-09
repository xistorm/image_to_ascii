import type { InputHTMLAttributes, PropsWithRef } from 'react';

export interface IInputBaseProps extends PropsWithRef<InputHTMLAttributes<HTMLInputElement>> {
    name: string;
}
