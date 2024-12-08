import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { NsButtonDefaultOptions, NsButtonOptions } from './button.interfaces';

@Component({
  selector: 'ns-button',
  template: `<ng-content></ng-content>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ButtonComponent {
  @HostBinding('class')
  protected hostClass = 'ns-btn';

  @HostBinding('attr.data-size')
  public size = input<NsButtonOptions['size']>(NsButtonDefaultOptions.size);

  @HostBinding('attr.data-color')
  public color = input<NsButtonOptions['color']>(NsButtonDefaultOptions.color);

  @HostBinding('attr.data-appearance')
  public appearance = input<NsButtonOptions['appearance']>(NsButtonDefaultOptions.appearance);

  @HostBinding('attr.data-icon')
  public icon = input<NsButtonOptions['icon']>(NsButtonDefaultOptions.icon);

  @HostBinding('attr.data-loading')
  public loading = input<NsButtonOptions['loading']>(NsButtonDefaultOptions.loading);
}
