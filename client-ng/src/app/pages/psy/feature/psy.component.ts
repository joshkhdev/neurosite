import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-psy',
  standalone: true,
  imports: [],
  templateUrl: './psy.component.html',
  styleUrl: './psy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsyComponent {}
