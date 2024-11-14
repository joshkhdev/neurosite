import { Component } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
  imports: [TuiHeader],
})
export class MainComponent {}
