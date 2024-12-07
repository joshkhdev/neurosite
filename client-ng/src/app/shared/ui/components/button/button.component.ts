import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { SlButtonDefaultOptions, SlButtonOptions } from './button.interfaces';

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
  public size = input<SlButtonOptions['size']>(SlButtonDefaultOptions.size);

  @HostBinding('attr.data-color')
  public color = input<SlButtonOptions['color']>(SlButtonDefaultOptions.color);

  @HostBinding('attr.data-appearance')
  public appearance = input<SlButtonOptions['appearance']>(SlButtonDefaultOptions.appearance);

  @HostBinding('attr.data-icon')
  public icon = input<SlButtonOptions['icon']>(SlButtonDefaultOptions.icon);

  @HostBinding('attr.data-loading')
  public loading = input<SlButtonOptions['loading']>(SlButtonDefaultOptions.loading);
}
