import { Cardapio, PageableResponse } from '@/types/cardapio.types';
import config from '../../../config';
import api from '../interceptors/interceptor';

interface CardapioAPI {
  listar: () => Promise<PageableResponse<Cardapio>>;
  criar: (cardapio: Partial<Cardapio>) => Promise<Cardapio>;
  atualizar: (id: string, cardapio: Partial<Cardapio>) => Promise<Cardapio>;
  excluir: (id: string) => Promise<void>;
  toggleAtivo: (id: string) => Promise<Cardapio>;
}
const uriCardapio = '/rest/cardapios';
const errorDominio = 'Erro ao consultar Cardapio';

export const cardapiosApi: CardapioAPI = {
  listar: async () => {
    const response = await api.get(uriCardapio);
    const data = await response.data;
    return data;
  },
  criar: async () => {
    return new Promise<Cardapio>((resolve, reject) => {
      setTimeout(() => {
        resolve({} as Cardapio);
      }, 1000);
    });
  },
  atualizar: async () => {
    return new Promise<Cardapio>((resolve, reject) => {
      setTimeout(() => {
        resolve({} as Cardapio);
      }, 1000);
    });
  },
  excluir: async () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  toggleAtivo: async () => {
    return new Promise<Cardapio>((resolve, reject) => {
      setTimeout(() => {
        resolve({} as Cardapio);
      }, 1000);
    });
  },
};
