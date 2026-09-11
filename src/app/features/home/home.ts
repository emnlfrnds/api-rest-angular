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
        console.log('Materiais Buscados:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar materiais:', erro);
      }
    });
  }

  getPorIdMaterial(id: number): void {
    if (!id) return;

    this.materiaisService.getPorIdMat(id).subscribe({
      next: (dado) => {
        this.materialSelecionado.set(dado);
        console.log('Material Buscado por Id:', dado);
      },
      error: (erro) => {
        if (erro.status === 404) {
          console.log(`O [ID: ${id}] não foi encontrado no banco de dados!`);
        } else {
          console.error('Erro ao buscar material:', erro);
        }

        this.materialSelecionado.set(null);
      }
    });
  }

  postMaterial(nome: string, marca: string): void {
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
        console.log('Material Adicionado:', dado);
        alert(`ID do material: ${dado.id}`);
      },
      error: (erro) => {
        console.error('Erro ao adicionar material:', erro);
      }
    });
  }

  putMaterial(id: number, nome: string, marca: string): void {
    if (!id || !nome.trim()) return;

    const atualizarMaterial: IMaterial = {
      id: id,
      nome: nome,
      marca: marca
    };

    this.materiaisService.putMat(atualizarMaterial).subscribe({
      next: (dado) => {
        this.materiais.update(lista =>
          lista.map(item => item.id === dado.id ? dado : item)
        );
        console.log('Material Atualidado:', dado);
      },
      error: (erro) => {
        console.log('Erro ao atualizar material:', erro);
      }

    })
  }

  deleteMaterial(id: number): void {
    if (!id) return;

    this.materiaisService.deleteMat(id).subscribe({
      next: () => {
        this.materiais.update(listaAtual =>
          listaAtual.filter(item => item.id !== id)
        );

        if (this.materialSelecionado()?.id === id) {
          this.materialSelecionado.set(null);
        }
        
        alert(`Material do [ID: ${id}] foi deletado!`);
        console.log(`Material do [ID: ${id}] foi deletado!`);
      },
      error: (erro) => {
        if (erro.status === 404) {
          console.log(`O [ID: ${id}] não foi encontrado no banco de dados!`);
        } else {
          console.error('Erro ao buscar material:', erro);
        }

        this.materialSelecionado.set(null);
      }
    });
  }
}
