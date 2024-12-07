import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ArticlesComponent {}
