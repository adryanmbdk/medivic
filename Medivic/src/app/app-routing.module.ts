import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tela-inicial',
    pathMatch: 'full'
  },
  {
    path: 'tela-inicial',
    loadChildren: () => import('./pages/tela-inicial/tela-inicial.module').then( m => m.TelaInicialPageModule)
  },
  {
    path: 'tela-login',
    loadChildren: () => import('./pages/tela-login/tela-login.module').then( m => m.TelaLoginPageModule)
  },
  {
    path: 'tela-cadastro',
    loadChildren: () => import('./pages/tela-cadastro/tela-cadastro.module').then( m => m.TelaCadastroPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'remedios',
    loadChildren: () => import('./pages/remedios/remedios.module').then( m => m.RemediosPageModule)
  },
  {
    path: 'cadastro-remedio',
    loadChildren: () => import('./pages/cadastro-remedio/cadastro-remedio.module').then( m => m.CadastroRemedioPageModule)
  },
  {
    path: 'cadastro-remedio/:idRemedio',
    loadChildren: () => import('./pages/cadastro-remedio/cadastro-remedio.module').then( m => m.CadastroRemedioPageModule)
  },
  {
    path: 'meu-perfil',
    loadChildren: () => import('./pages/meu-perfil/meu-perfil.module').then( m => m.MeuPerfilPageModule)
  },
  {
    path: 'alarme',
    loadChildren: () => import('./pages/alarme/alarme.module').then( m => m.AlarmePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
