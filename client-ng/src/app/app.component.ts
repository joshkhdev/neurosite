import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/ui/components/header/header.component';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {}
