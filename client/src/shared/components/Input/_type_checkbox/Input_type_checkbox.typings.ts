import type { IInputBaseProps } from '../-Base';
import type { IInputErrorProps } from '../-Error';

export interface IInputTypeCheckboxProps extends IInputBaseProps, IInputErrorProps {
    type: 'checkbox';
}
