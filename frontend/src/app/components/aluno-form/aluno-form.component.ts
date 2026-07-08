import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { Aluno } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit {

  form!: FormGroup;
  idaluno?: number;
  modoEdicao = false;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['', Validators.required],
      dt_nasc: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEdicao = true;
      this.idaluno = Number(idParam);

      this.alunoService.getById(this.idaluno).subscribe({
        next: (aluno) => {
          this.form.patchValue({
            nome: aluno.nome,
            sexo: aluno.sexo,
            dt_nasc: this.formatarDataParaInput(aluno.dt_nasc)
          });
        },
        error: (err) => console.error('Erro ao carregar aluno', err)
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const aluno: Aluno = this.form.value;

    const operacao = this.modoEdicao
      ? this.alunoService.update(this.idaluno!, aluno)
      : this.alunoService.create(aluno);

    operacao.subscribe({
      next: () => this.router.navigate(['/alunos']),
      error: (err) => console.error('Erro ao salvar aluno', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }

  private formatarDataParaInput(data: string | Date): string {
    if (!data) return '';

    const dataTexto = String(data);
    return dataTexto.length >= 10 ? dataTexto.substring(0, 10) : '';
  }
}
