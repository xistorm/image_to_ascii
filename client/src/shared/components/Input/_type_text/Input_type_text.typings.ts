import type { IInputBaseProps } from '../-Base';
import type { IInputErrorProps } from '../-Error';

export interface IInputTypeTextProps extends IInputBaseProps, IInputErrorProps {
    type: 'text' | 'email';
}
