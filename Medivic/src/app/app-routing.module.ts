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
    loadChildren: () => import('./pages/tela-inicial/tela-inicial.module').then(m => m.TelaInicialPageModule)
  },
  {
    path: 'tela-login',
    loadChildren: () => import('./pages/tela-login/tela-login.module').then(m => m.TelaLoginPageModule)
  },
  {
    path: 'tela-cadastro',
    loadChildren: () => import('./pages/tela-cadastro/tela-cadastro.module').then(m => m.TelaCadastroPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'remedios',
    loadChildren: () => import('./pages/remedios/remedios.module').then(m => m.RemediosPageModule)
  },
  {
    path: 'remedios/:idUsuario',
    loadChildren: () => import('./pages/remedios/remedios.module').then(m => m.RemediosPageModule)
  },
  {
    path: 'cadastro-remedio/:idUsuario',
    loadChildren: () => import('./pages/cadastro-remedio/cadastro-remedio.module').then(m => m.CadastroRemedioPageModule)
  },
  {
    path: 'cadastro-remedio/:idUsuario/:idRemedio',
    loadChildren: () => import('./pages/cadastro-remedio/cadastro-remedio.module').then(m => m.CadastroRemedioPageModule)
  },
  {
    path: 'meu-perfil',
    loadChildren: () => import('./pages/meu-perfil/meu-perfil.module').then(m => m.MeuPerfilPageModule)
  },
  {
    path: 'alarme',
    loadChildren: () => import('./pages/alarme/alarme.module').then(m => m.AlarmePageModule)
  },
  {
    path: 'tela-esqueci-a-senha',
    loadChildren: () => import('./pages/tela-esqueci-a-senha/tela-esqueci-a-senha.module').then(m => m.TelaEsqueciASenhaPageModule)
  },
  {
    path: 'dependentes',
    loadChildren: () => import('./pages/dependentes/dependentes.module').then(m => m.DependentesPageModule)
  },
  {
    path: 'cadastro-dependente',
    loadChildren: () => import('./pages/cadastro-dependente/cadastro-dependente.module').then(m => m.CadastroDependentePageModule)
  },
  {
    path: 'cadastro-dependente/:idUsuario',
    loadChildren: () => import('./pages/cadastro-dependente/cadastro-dependente.module').then(m => m.CadastroDependentePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
