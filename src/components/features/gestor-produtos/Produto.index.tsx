import { useState, useEffect } from 'react';
import { useProdutos } from '@/hooks/useProdutos';
import { ProdutosList } from './components/ProdutosList';
import { ProdutoModal } from './components/ProdutoModal';
import { Produto } from '@/types/cardapio.types';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'react-toastify';

export default function GerenciadorProdutos() {
  const {
    produtos,
    categorias,
    loading,
    carregarProdutos,
    carregarCategorias,
    criarProduto,
    atualizarProduto,
    excluirProduto,
  } = useProdutos();

  const [modalOpen, setModalOpen] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      carregarProdutos();
      carregarCategorias();
    }
  }, [carregarProdutos, carregarCategorias, isClient]);

  const handleSaveProduto = async (produto: Partial<Produto>) => {
    try {
      if ('id' in produto && produto.id) {
        await atualizarProduto(produto.id, produto);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await criarProduto(produto);
        toast.success('Produto criado com sucesso!');
      }
      setModalOpen(false);
      setProdutoEmEdicao(null);
      carregarProdutos();
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleDeleteProduto = async (id: string) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
        await excluirProduto(id);
        toast.success('Produto excluído com sucesso!');
        carregarProdutos();
      }
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (!isClient) {
    return null;
  }

  if (loading && !produtos.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Produtos</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            setProdutoEmEdicao(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors"
        >
          Novo Produto
        </button>
      </div>

      <ProdutosList
        produtos={produtos}
        categorias={categorias}
        onEdit={(produto) => {
          setProdutoEmEdicao(produto);
          setModalOpen(true);
        }}
        onDelete={handleDeleteProduto}
        onToggleAtivo={async (id) => {
          try {
            const produto = produtos.find((p) => p.id === id);
            if (produto) {
              await atualizarProduto(id, {
                ...produto,
                ativo: !produto.ativo,
              });
              toast.success('Status do produto atualizado!');
              carregarProdutos();
            }
          } catch (error) {
            toast.error('Erro ao atualizar status do produto');
          }
        }}
        onToggleDestaque={async (id) => {
          try {
            const produto = produtos.find((p) => p.id === id);
            if (produto) {
              await atualizarProduto(id, {
                ...produto,
                destaque: !produto.destaque,
              });
              toast.success('Destaque do produto atualizado!');
              carregarProdutos();
            }
          } catch (error) {
            toast.error('Erro ao atualizar destaque do produto');
          }
        }}
      />

      {modalOpen && (
        <ProdutoModal
          produto={produtoEmEdicao || undefined}
          categorias={categorias}
          onClose={() => {
            setModalOpen(false);
            setProdutoEmEdicao(null);
          }}
          onSave={handleSaveProduto}
        />
      )}
    </div>
  );
}
