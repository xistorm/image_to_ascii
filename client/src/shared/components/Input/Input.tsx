import { type FC } from 'react';

import type { IInputProps } from './Input.typings';
import { InputTypeCheckbox } from './_type_checkbox';
import { InputTypeFile } from './_type_file';
import { InputTypePassword } from './_type_password';
import { InputTypeText } from './_type_text';
import { InputTypeRange } from './_type_range';
import { InputTypeChoice } from './_type_choice';

export const Input: FC<IInputProps> = (props) => {
    switch (props.type) {
        case 'text':
        case 'email':
            return (
                <InputTypeText {...props} />
            );
        case 'password':
            return (
                <InputTypePassword {...props} />
            );
        case 'checkbox':
            return (
                <InputTypeCheckbox {...props} />
            );
        case 'file':
            return (
                <InputTypeFile {...props} />
            );
        case 'range':
            return (
                <InputTypeRange {...props} />
            );
        case 'choice':
            return (
                <InputTypeChoice {...props} />
            );
    }
};
