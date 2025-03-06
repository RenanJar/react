import { useState, useCallback } from 'react';
import { Produto, Categoria } from '@/types/cardapio.types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import api from '@/services/interceptors/interceptor';

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const carregarProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        router.push('/login');
        return;
      }
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const carregarCategorias = useCallback(async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }, []);

  const criarProduto = useCallback(async (produto: Partial<Produto>) => {
    const response = await api.post('/produtos', produto);
    return response.data;
  }, []);

  const atualizarProduto = useCallback(async (id: string, produto: Partial<Produto>) => {
    const response = await api.put(`/produtos/${id}`, produto);
    return response.data;
  }, []);

  const excluirProduto = useCallback(async (id: string) => {
    await api.delete(`/produtos/${id}`);
  }, []);

  return {
    produtos,
    categorias,
    loading,
    carregarProdutos,
    carregarCategorias,
    criarProduto,
    atualizarProduto,
    excluirProduto,
  };
}
