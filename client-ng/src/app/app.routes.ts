import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PsyComponent } from './pages/psy/psy.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'psy',
    component: PsyComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
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
    path: '**',
    redirectTo: '',
  },
];
