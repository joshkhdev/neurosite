import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ns-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {}
