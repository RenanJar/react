export interface Categoria {
  id: string;
  nome: string;
  ativo: boolean;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  cardapioId: string;
  imagem?: string;
  ativo: boolean;
  destaque: boolean;
  ingredientes: string[];
  tempoPreparoMinutos: number;
}

export interface Cardapio {
  id: string;
  nome: string;
  descricao: string;
  categorias: Categoria[];
}

export interface NavigationItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export interface SideBarProps {
  title: string;
  backgroundColor: string;
  hoverBgColor: string;
  navigationItems: NavigationItem[];
}
