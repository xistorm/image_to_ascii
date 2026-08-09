import type { IInputBaseProps } from '../-Base';
import type { IInputErrorProps } from '../-Error';

export interface IInputTypePasswordProps extends IInputBaseProps, IInputErrorProps {
    type: 'password';
}
