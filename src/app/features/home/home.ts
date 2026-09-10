import { Component, inject, signal } from '@angular/core';
import { MaterialService } from '../../core/service/material';
import { IMaterial } from '../../core/interface/IMaterial';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private materiaisService = inject(MaterialService);
  
  materiais = signal<IMaterial[]>([]);
  materialSelecionado = signal<IMaterial | null>(null);
  
  getMateriais(): void {
    this.materiaisService.getMat().subscribe({
      next: (dados) => {
        this.materiais.set(dados);
        console.log(dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar materiais:', erro);
      }
    });
  }

  getPorIdMateriais(id: number): void {
    if (!id) return;

    this.materiaisService.getPorIdMat(id).subscribe({
      next: (dado) => {
        this.materialSelecionado.set(dado);
        console.log(dado);
      },
      error: (erro) => {
        console.error('Erro ao buscar material:', erro);
        this.materialSelecionado.set(null);
      }
    });
  }

  postMateriais(nome: string, marca: string): void {
    if (!nome.trim()) return;

    const listaAtual = this.materiais();

    const proxId = listaAtual.length > 0
    ? Math.max(...listaAtual.map(m => Number(m.id) || 0)) + 1
    : 1;

    const novoMaterial: IMaterial = { 
      id: proxId,
      nome,
      marca
    };

    this.materiaisService.postMat(novoMaterial).subscribe({
      next: (dado) => {
        this.materiais.update(lista => [...lista, dado]);
        console.log('Adicionado:', dado);
      },
      error: (erro) => {
        console.error('Erro ao adicionar material:', erro);
      }
    });
  }
}
