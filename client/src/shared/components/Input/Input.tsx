import { forwardRef } from 'react';

import { InputTypeCheckbox } from './_type_checkbox';
import { InputTypeFile } from './_type_file';
import { InputTypePassword } from './_type_password';
import { InputTypeText } from './_type_text';

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
        case 'file':
            return (
                <InputTypeFile ref={forwardRef} {...props} />
            );
    }
});
