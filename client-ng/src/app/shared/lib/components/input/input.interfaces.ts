import { NsColor, NsSize } from '../../../ui/common/types';

export interface NsInputOptions {
  size: NsSize;
  color: NsColor | undefined;
  prefixIcon: boolean | undefined;
  suffixIcon: boolean | undefined;
}

export const NsInputDefaultOptions: NsInputOptions = {
  size: 'md',
  color: 'primary',
  prefixIcon: undefined,
  suffixIcon: undefined,
} as const;
