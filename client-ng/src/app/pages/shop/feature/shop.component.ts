import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {}
