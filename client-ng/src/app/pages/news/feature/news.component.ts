import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {}
