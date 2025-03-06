import { Produto } from '@/types/cardapio.types';
import { PageableResponse } from '@/types/PageableResponse.interface';
import api from '../interceptors/interceptor';

interface ProdutoAPI {
  listar: () => Promise<PageableResponse<Produto>>;
}

export const produtoApi: ProdutoAPI = {
  listar: async () => {
    const response = await api.get('/rest/produtos');
    return response.data;
  },
};
