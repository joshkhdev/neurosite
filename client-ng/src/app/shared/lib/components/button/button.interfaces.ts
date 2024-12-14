import { NsAppearance, NsColor, NsIcon, NsSize } from '../../../ui/common/types';

export interface NsButtonOptions {
  size: NsSize;
  color: NsColor | undefined;
  appearance: NsAppearance;
  icon: NsIcon | undefined;
  loading: boolean | undefined;
}

export const NsButtonDefaultOptions: NsButtonOptions = {
  size: 'md',
  color: 'primary',
  appearance: 'normal',
  icon: undefined,
  loading: undefined,
} as const;
