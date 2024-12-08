import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AboutComponent {}
