import { Cardapio, Produto } from '@/types/cardapio.types';

// Dados iniciais mockados
let cardapiosMock: Cardapio[] = [
  {
    id: '1',
    nome: 'Cardápio Principal',
    ativo: true,
    categorias: [],
    produtos: [],
  },
  {
    id: '2',
    nome: 'Cardápio de Bebidas',
    ativo: true,
    categorias: [],
    produtos: [],
  },
  {
    id: '3',
    nome: 'Cardápio de Sobremesas',
    ativo: false,
    categorias: [],
    produtos: [],
  },
];

let produtosMock: Produto[] = [
  {
    id: '1',
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',
    preco: 45.9,
    cardapioId: '1',
    imagem: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    ativo: true,
    destaque: true,
    ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão', 'Azeite'],
    tempoPreparoMinutos: 25,
  },
  {
    id: '2',
    nome: 'Refrigerante Cola 2L',
    descricao: 'Refrigerante sabor cola 2 litros',
    preco: 12.9,
    cardapioId: '2',
    imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    ativo: true,
    destaque: false,
    ingredientes: [],
    tempoPreparoMinutos: 0,
  },
  {
    id: '3',
    nome: 'Pudim de Leite',
    descricao: 'Pudim de leite condensado tradicional',
    preco: 15.9,
    cardapioId: '3',
    imagem: 'https://images.unsplash.com/photo-1590083745251-4fdb0b285c6a',
    ativo: true,
    destaque: true,
    ingredientes: ['Leite condensado', 'Leite', 'Ovos', 'Açúcar'],
    tempoPreparoMinutos: 0,
  },
];

// Funções auxiliares
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock da API de Cardápios
export const cardapiosMockApi = {
  listar: async (): Promise<Cardapio[]> => {
    await delay(800);
    return [...cardapiosMock];
  },

  criar: async (cardapio: Partial<Cardapio>): Promise<Cardapio> => {
    await delay(800);
    const novoCardapio: Cardapio = {
      id: generateId(),
      nome: cardapio.nome!,
      ativo: cardapio.ativo ?? true,
      categorias: [],
      produtos: [],
    };
    cardapiosMock.push(novoCardapio);
    return novoCardapio;
  },

  atualizar: async (id: string, cardapio: Partial<Cardapio>): Promise<Cardapio> => {
    await delay(800);
    const index = cardapiosMock.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Cardápio não encontrado');

    const cardapioAtualizado = {
      ...cardapiosMock[index],
      ...cardapio,
    };
    cardapiosMock[index] = cardapioAtualizado;
    return cardapioAtualizado;
  },

  excluir: async (id: string): Promise<void> => {
    await delay(800);
    const produtosCardapio = produtosMock.some((p) => p.cardapioId === id);
    if (produtosCardapio) {
      throw new Error('Não é possível excluir um cardápio que possui produtos');
    }
    cardapiosMock = cardapiosMock.filter((c) => c.id !== id);
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
      cardapioId: produto.cardapioId!,
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
