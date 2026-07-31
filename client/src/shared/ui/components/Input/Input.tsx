import { InputTypeCheckbox } from '@/shared/ui/components/Input/_type_checkbox';
import { InputTypePassword } from '@/shared/ui/components/Input/_type_password';
import { InputTypeText } from '@/shared/ui/components/Input/_type_text';
import { forwardRef } from 'react';

import type { IInputProps } from './Input.typings';

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, forwardRef) => {
    switch (props.type) {
        case 'text':
        case 'email':
            return (
                <InputTypeText ref={forwardRef} {...props} />
            );
        case 'password':
            return (
                <InputTypePassword ref={forwardRef} {...props} />
            );
        case 'checkbox':
            return (
                <InputTypeCheckbox ref={forwardRef} {...props} />
            );
    }
});
