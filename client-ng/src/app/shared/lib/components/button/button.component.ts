import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NsButtonDefaultOptions, NsButtonOptions } from './button.interfaces';

@Component({
  selector: 'ns-button, button[nsButton]',
  template: `<ng-content></ng-content>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @HostBinding('class')
  protected hostClass = 'ns-btn';

  @Input()
  @HostBinding('attr.data-size')
  public size: NsButtonOptions['size'] = NsButtonDefaultOptions.size;

  @Input()
  @HostBinding('attr.data-color')
  public color: NsButtonOptions['color'] = NsButtonDefaultOptions.color;

  @Input()
  @HostBinding('attr.data-appearance')
  public appearance: NsButtonOptions['appearance'] = NsButtonDefaultOptions.appearance;

  @Input()
  @HostBinding('attr.data-icon')
  public icon: NsButtonOptions['icon'] = NsButtonDefaultOptions.icon;

  @Input()
  @HostBinding('attr.data-loading')
  public loading: NsButtonOptions['loading'] = NsButtonDefaultOptions.loading;
}
