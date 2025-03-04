import { Categoria, Produto } from '@/types/cardapio.types';
import { categoriasMockApi, produtosMockApi } from '../mock/cardapioMock';

// Interface para padronizar as operações da API
interface CategoriaAPI {
  listar: () => Promise<Categoria[]>;
  criar: (categoria: Partial<Categoria>) => Promise<Categoria>;
  atualizar: (id: string, categoria: Partial<Categoria>) => Promise<Categoria>;
  excluir: (id: string) => Promise<void>;
  toggleAtivo: (id: string) => Promise<Categoria>;
}

interface ProdutoAPI {
  listar: () => Promise<Produto[]>;
  criar: (produto: Partial<Produto>) => Promise<Produto>;
  atualizar: (id: string, produto: Partial<Produto>) => Promise<Produto>;
  excluir: (id: string) => Promise<void>;
  toggleAtivo: (id: string) => Promise<Produto>;
  toggleDestaque: (id: string) => Promise<Produto>;
}

// Implementação do mock com as interfaces corretas
export const categoriasApi: CategoriaAPI = {
  ...categoriasMockApi,
  toggleAtivo: async (id: string) => {
    const categoria = await categoriasMockApi.atualizar(id, {
      ativo: !(await categoriasMockApi.listar()).find((c) => c.id === id)?.ativo,
    });
    return categoria;
  },
};

export const produtosApi: ProdutoAPI = {
  ...produtosMockApi,
  toggleAtivo: async (id: string) => {
    const produto = await produtosMockApi.atualizar(id, {
      ativo: !(await produtosMockApi.listar()).find((p) => p.id === id)?.ativo,
    });
    return produto;
  },
  toggleDestaque: async (id: string) => {
    const produto = await produtosMockApi.atualizar(id, {
      destaque: !(await produtosMockApi.listar()).find((p) => p.id === id)?.destaque,
    });
    return produto;
  },
};
