import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Aluno } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss'
})
export class AlunoListComponent implements OnInit {

  dataSource = new MatTableDataSource<Aluno>([]);
  colunasExibidas: string[] = ['nome', 'sexo', 'dt_nasc', 'acoes'];

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.buscarAlunos();
  }

  buscarAlunos(): void {
    this.alunoService.getAll().subscribe({
      next: (dados) => this.dataSource.data = dados,
      error: (err) => console.error('Erro ao buscar alunos', err)
    });
  }

  excluir(id: number | undefined): void {
    if (!id) return;

    if (confirm('Deseja realmente excluir este aluno?')) {
      this.alunoService.delete(id).subscribe({
        next: () => this.buscarAlunos(),
        error: (err) => console.error('Erro ao excluir aluno', err)
      });
    }
  }
}
