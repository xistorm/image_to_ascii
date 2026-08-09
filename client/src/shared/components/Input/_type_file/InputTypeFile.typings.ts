import type { IInputBaseProps } from '@/shared/components/Input/-Base';
import type { IInputErrorProps } from '@/shared/components/Input/-Error';

export interface IInputTypeFileProps extends IInputBaseProps, IInputErrorProps {
    type: 'file';
}
