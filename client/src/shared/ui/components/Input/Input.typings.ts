import type { IInputTypeCheckboxProps } from './_type_checkbox';
import type { IInputTypeFileProps } from './_type_file';
import type { IInputTypePasswordProps } from './_type_password';
import type { IInputTypeTextProps } from './_type_text';

export type IInputProps =
    IInputTypeTextProps |
    IInputTypePasswordProps |
    IInputTypeCheckboxProps |
    IInputTypeFileProps;
