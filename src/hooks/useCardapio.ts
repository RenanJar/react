import { useState, useCallback } from 'react';
import { Categoria, Produto } from '@/types/cardapio.types';
import { categoriasApi, produtosApi } from '@/services/api/cardapio';
import { toast } from 'react-toastify';

export function useCardapio() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  // Funções para Categorias
  const carregarCategorias = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoriasApi.listar();
      setCategorias(data);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const criarCategoria = useCallback(async (categoria: Partial<Categoria>) => {
    try {
      setLoading(true);
      const novaCategoriaData = await categoriasApi.criar(categoria);
      setCategorias((prev) => [...prev, novaCategoriaData]);
      toast.success('Categoria criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar categoria');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarCategoria = useCallback(async (id: string, categoria: Partial<Categoria>) => {
    try {
      setLoading(true);
      const categoriaAtualizada = await categoriasApi.atualizar(id, categoria);
      setCategorias((prev) => prev.map((cat) => (cat.id === id ? categoriaAtualizada : cat)));
      toast.success('Categoria atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar categoria');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const excluirCategoria = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await categoriasApi.excluir(id);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      toast.success('Categoria excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir categoria');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Funções para Produtos
  const carregarProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await produtosApi.listar();
      setProdutos(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const criarProduto = useCallback(async (produto: Partial<Produto>) => {
    try {
      setLoading(true);
      const novoProdutoData = await produtosApi.criar(produto);
      setProdutos((prev) => [...prev, novoProdutoData]);
      toast.success('Produto criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarProduto = useCallback(async (id: string, produto: Partial<Produto>) => {
    try {
      setLoading(true);
      const produtoAtualizado = await produtosApi.atualizar(id, produto);
      setProdutos((prev) => prev.map((prod) => (prod.id === id ? produtoAtualizado : prod)));
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const excluirProduto = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await produtosApi.excluir(id);
      setProdutos((prev) => prev.filter((prod) => prod.id !== id));
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categorias,
    produtos,
    loading,
    carregarCategorias,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria,
    carregarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
  };
}
