import type { IInputTypeCheckboxProps } from './_type_checkbox';
import type { IInputTypeFileProps } from './_type_file';
import type { IInputTypePasswordProps } from './_type_password';
import type { IInputTypeTextProps } from './_type_text';
import type { IInputTypeRangeProps } from './_type_range';
import type { IInputTypeChoiceProps } from './_type_choice';

export type IInputProps =
    IInputTypeTextProps |
    IInputTypePasswordProps |
    IInputTypeCheckboxProps |
    IInputTypeFileProps |
    IInputTypeRangeProps |
    IInputTypeChoiceProps;
