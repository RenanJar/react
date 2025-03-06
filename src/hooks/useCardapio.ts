import { useState, useCallback } from 'react';
import { Cardapio, PageableResponse } from '@/types/cardapio.types';
import { cardapiosApi } from '@/services/api/cardapio.api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export function useCardapio() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const carregarCardapios = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cardapiosApi.listar();

      setCardapios(response.content);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        router.push('/login');
        return;
      }
      toast.error('Erro ao carregar cardápios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const criarCardapio = useCallback(async (cardapio: Partial<Cardapio>) => {
    try {
      setLoading(true);
      const novoCardapioData = await cardapiosApi.criar(cardapio);
      setCardapios((prev) => [...prev, novoCardapioData]);
      toast.success('Cardápio criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar cardápio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarCardapio = useCallback(async (id: string, cardapio: Partial<Cardapio>) => {
    try {
      setLoading(true);
      const cardapioAtualizado = await cardapiosApi.atualizar(id, cardapio);
      setCardapios((prev) => prev.map((cat) => (cat.id === id ? cardapioAtualizado : cat)));
      toast.success('Cardápio atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar cardápio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const excluirCardapio = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await cardapiosApi.excluir(id);
      setCardapios((prev) => prev.filter((cat) => cat.id !== id));
      toast.success('Cardápio excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir cardápio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cardapios,
    loading,
    carregarCardapios,
    criarCardapio,
    atualizarCardapio,
    excluirCardapio,
  };
}
