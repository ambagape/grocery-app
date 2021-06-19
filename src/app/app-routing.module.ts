import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },   
  {
    path: 'home',
    loadChildren: () => import('./groceries/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./groceries/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./groceries/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'show/:id',
    loadChildren: () => import('./groceries/show/show.module').then( m => m.ShowPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
