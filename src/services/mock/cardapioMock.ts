import { Categoria, Produto } from '@/types/cardapio.types';

// Dados iniciais mockados
let categoriasMock: Categoria[] = [
  {
    id: '1',
    nome: 'Pizzas Tradicionais',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Pizzas Especiais',
    ativo: true,
  },
  {
    id: '3',
    nome: 'Bebidas',
    ativo: true,
  },
  {
    id: '4',
    nome: 'Sobremesas',
    ativo: false,
  },
];

let produtosMock: Produto[] = [
  {
    id: '1',
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',
    preco: 45.9,
    categoriaId: '1',
    imagem: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    ativo: true,
    destaque: true,
    ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão', 'Azeite'],
    tempoPreparoMinutos: 25,
  },
  {
    id: '2',
    nome: 'Pizza 4 Queijos',
    descricao: 'Mussarela, parmesão, gorgonzola e catupiry',
    preco: 55.9,
    categoriaId: '2',
    imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    ativo: true,
    destaque: true,
    ingredientes: ['Mussarela', 'Parmesão', 'Gorgonzola', 'Catupiry'],
    tempoPreparoMinutos: 25,
  },
  {
    id: '3',
    nome: 'Coca-Cola 2L',
    descricao: 'Refrigerante Coca-Cola 2 litros',
    preco: 12.9,
    categoriaId: '3',
    imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    ativo: true,
    destaque: false,
    ingredientes: [],
    tempoPreparoMinutos: 0,
  },
];

// Funções auxiliares
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock da API de Categorias
export const categoriasMockApi = {
  listar: async (): Promise<Categoria[]> => {
    await delay(800); // Simula delay da rede
    return [...categoriasMock];
  },

  criar: async (categoria: Partial<Categoria>): Promise<Categoria> => {
    await delay(800);
    const novaCategoria: Categoria = {
      id: generateId(),
      nome: categoria.nome!,
      ativo: categoria.ativo ?? true,
    };
    categoriasMock.push(novaCategoria);
    return novaCategoria;
  },

  atualizar: async (id: string, categoria: Partial<Categoria>): Promise<Categoria> => {
    await delay(800);
    const index = categoriasMock.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Categoria não encontrada');

    const categoriaAtualizada = {
      ...categoriasMock[index],
      ...categoria,
    };
    categoriasMock[index] = categoriaAtualizada;
    return categoriaAtualizada;
  },

  excluir: async (id: string): Promise<void> => {
    await delay(800);
    const produtosCategoria = produtosMock.some((p) => p.categoriaId === id);
    if (produtosCategoria) {
      throw new Error('Não é possível excluir uma categoria que possui produtos');
    }
    categoriasMock = categoriasMock.filter((c) => c.id !== id);
  },
};

// Mock da API de Produtos
export const produtosMockApi = {
  listar: async (): Promise<Produto[]> => {
    await delay(800);
    return [...produtosMock];
  },

  criar: async (produto: Partial<Produto>): Promise<Produto> => {
    await delay(800);
    const novoProduto: Produto = {
      id: generateId(),
      nome: produto.nome!,
      descricao: produto.descricao!,
      preco: produto.preco!,
      categoriaId: produto.categoriaId!,
      imagem: produto.imagem || '',
      ativo: produto.ativo ?? true,
      destaque: produto.destaque ?? false,
      ingredientes: produto.ingredientes || [],
      tempoPreparoMinutos: produto.tempoPreparoMinutos || 0,
    };
    produtosMock.push(novoProduto);
    return novoProduto;
  },

  atualizar: async (id: string, produto: Partial<Produto>): Promise<Produto> => {
    await delay(800);
    const index = produtosMock.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');

    const produtoAtualizado = {
      ...produtosMock[index],
      ...produto,
    };
    produtosMock[index] = produtoAtualizado;
    return produtoAtualizado;
  },

  excluir: async (id: string): Promise<void> => {
    await delay(800);
    produtosMock = produtosMock.filter((p) => p.id !== id);
  },
};
