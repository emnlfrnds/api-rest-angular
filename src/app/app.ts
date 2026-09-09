import { Component, inject, signal } from '@angular/core';
import { Materiais } from './materiais';
import { IMaterial } from './IMaterial';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  private materiaisService = inject(Materiais);

  protected readonly title = signal('ReqApi');
  
  materiais = signal<IMaterial[]>([]);
  obterTodosMateriais(): void {
    this.materiaisService.obterTodos().subscribe({
      next: (dados) => {
        this.materiais.set(dados);
        console.log(dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar materiais:', erro);
      }
    })
  }

  materialSelecionado = signal<IMaterial | null>(null)
  obterSomenteUm(id: number): void {
    this.materiaisService.obterPorId(id).subscribe({
      next: (dado) => {
        this.materialSelecionado.set(dado);
        console.log(dado);
      },
      error: (erro) => {
        console.error('Erro ao buscar material:', erro);
      }
    })
  }
}
