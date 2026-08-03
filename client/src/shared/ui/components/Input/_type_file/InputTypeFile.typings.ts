import type { IInputBaseProps } from '@/shared/ui/components/Input/-Base';
import type { IInputErrorProps } from '@/shared/ui/components/Input/-Error';

export interface IInputTypeFileProps extends IInputBaseProps, IInputErrorProps {
    type: 'file';
}
