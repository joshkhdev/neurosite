import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NsInputDefaultOptions, NsInputOptions } from './input.interfaces';

@Component({
  selector: 'ns-input, input[nsInput]',
  template: `<ng-content></ng-content>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @HostBinding('class')
  protected hostClass = 'ns-input';

  @Input()
  @HostBinding('attr.data-size')
  public size: NsInputOptions['size'] = NsInputDefaultOptions.size;

  @Input()
  @HostBinding('attr.data-color')
  public color: NsInputOptions['color'] = NsInputDefaultOptions.color;

  @Input()
  @HostBinding('attr.data-prefix-icon')
  public prefixIcon: NsInputOptions['prefixIcon'] = NsInputDefaultOptions.prefixIcon;

  @Input()
  @HostBinding('attr.data-suffix-icon')
  public suffixIcon: NsInputOptions['suffixIcon'] = NsInputDefaultOptions.suffixIcon;
}
