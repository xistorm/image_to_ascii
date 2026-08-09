import type { InputHTMLAttributes, Ref } from 'react';

export interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement | null>;
    name: string;
}
