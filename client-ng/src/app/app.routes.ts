import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/feature/main.component';
import { NewsComponent } from './pages/news/feature/news.component';
import { ArticlesComponent } from './pages/articles/feature/articles.component';
import { ProjectsComponent } from './pages/projects/feature/projects.component';
import { PsyComponent } from './pages/psy/feature/psy.component';
import { ShopComponent } from './pages/shop/feature/shop.component';
import { AboutComponent } from './pages/about/feature/about.component';
import { LoginComponent } from './pages/login/feature/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'news',
    loadComponent: () => NewsComponent,
  },
  {
    path: 'articles',
    loadComponent: () => ArticlesComponent,
  },
  {
    path: 'projects',
    loadComponent: () => ProjectsComponent,
  },
  {
    path: 'psy',
    loadComponent: () => PsyComponent,
  },
  {
    path: 'shop',
    loadComponent: () => ShopComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
