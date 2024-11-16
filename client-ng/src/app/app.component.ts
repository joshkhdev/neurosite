import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, TuiRoot],
})
export class AppComponent {}
