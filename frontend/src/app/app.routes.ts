import { Routes } from '@angular/router';

import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
import { AlunoListComponent } from './components/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './components/aluno-form/aluno-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },

  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/novo', component: CursoFormComponent },
  { path: 'cursos/editar/:id', component: CursoFormComponent },

  { path: 'alunos', component: AlunoListComponent },
  { path: 'alunos/novo', component: AlunoFormComponent },
  { path: 'alunos/editar/:id', component: AlunoFormComponent }
];
