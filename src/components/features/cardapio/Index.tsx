import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useCardapio } from '@/hooks/useCardapio';
import { CategoriasList } from '@/components/features/cardapio/CategoriasList';
import { ProdutosList } from '@/components/features/cardapio/ProdutosList';
import { CategoriaModal } from '@/components/features/cardapio/CategoriaModal';
import { ProdutoModal } from '@/components/features/cardapio/ProdutoModal';
import { Categoria, Produto } from '@/types/cardapio.types';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'react-toastify';

export default function GerenciadorCardapio() {
  const {
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
  } = useCardapio();

  const [selectedTab, setSelectedTab] = useState(0);
  const [modalType, setModalType] = useState<'categoria' | 'produto' | null>(null);
  const [itemEmEdicao, setItemEmEdicao] = useState<Categoria | Produto | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        await Promise.all([carregarCategorias(), carregarProdutos()]);
      } catch (error) {
        toast.error('Erro ao carregar dados do cardápio');
      }
    };
    carregarDados();
  }, [carregarCategorias, carregarProdutos]);

  const handleSaveCategoria = async (categoria: Partial<Categoria>) => {
    try {
      if ('id' in categoria && categoria.id) {
        await atualizarCategoria(categoria.id, categoria);
        toast.success('Categoria atualizada com sucesso!');
      } else {
        await criarCategoria(categoria);
        toast.success('Categoria criada com sucesso!');
      }
      setModalType(null);
      setItemEmEdicao(null);
    } catch (error) {
      toast.error('Erro ao salvar categoria');
    }
  };

  const handleSaveProduto = async (produto: Partial<Produto>) => {
    try {
      if ('id' in produto && produto.id) {
        await atualizarProduto(produto.id, produto);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await criarProduto(produto);
        toast.success('Produto criado com sucesso!');
      }
      setModalType(null);
      setItemEmEdicao(null);
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleDeleteCategoria = async (id: string) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
        await excluirCategoria(id);
        toast.success('Categoria excluída com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao excluir categoria');
    }
  };

  const handleDeleteProduto = async (id: string) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
        await excluirProduto(id);
        toast.success('Produto excluído com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (loading && !categorias.length && !produtos.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Cardápio</h1>
        <div className="space-x-4">
          <button
            onClick={() => {
              setModalType('categoria');
              setItemEmEdicao(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nova Categoria
          </button>
          <button
            onClick={() => {
              setModalType('produto');
              setItemEmEdicao(null);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Novo Produto
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
              ${
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              }`
            }
          >
            Categorias
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
              ${
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              }`
            }
          >
            Produtos
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <CategoriasList
              categorias={categorias}
              onEdit={(categoria) => {
                setModalType('categoria');
                setItemEmEdicao(categoria);
              }}
              onDelete={handleDeleteCategoria}
              onToggleAtivo={async (id) => {
                try {
                  await atualizarCategoria(id, {
                    ativo: !categorias.find((c) => c.id === id)?.ativo,
                  });
                  toast.success('Status da categoria atualizado!');
                } catch (error) {
                  toast.error('Erro ao atualizar status da categoria');
                }
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ProdutosList
              produtos={produtos}
              categorias={categorias}
              onEdit={(produto) => {
                setModalType('produto');
                setItemEmEdicao(produto);
              }}
              onDelete={handleDeleteProduto}
              onToggleAtivo={async (id) => {
                try {
                  await atualizarProduto(id, {
                    ativo: !produtos.find((p) => p.id === id)?.ativo,
                  });
                  toast.success('Status do produto atualizado!');
                } catch (error) {
                  toast.error('Erro ao atualizar status do produto');
                }
              }}
              onToggleDestaque={async (id) => {
                try {
                  await atualizarProduto(id, {
                    destaque: !produtos.find((p) => p.id === id)?.destaque,
                  });
                  toast.success('Destaque do produto atualizado!');
                } catch (error) {
                  toast.error('Erro ao atualizar destaque do produto');
                }
              }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {modalType === 'categoria' && (
        <CategoriaModal
          categoria={itemEmEdicao as Categoria}
          onClose={() => {
            setModalType(null);
            setItemEmEdicao(null);
          }}
          onSave={handleSaveCategoria}
        />
      )}

      {modalType === 'produto' && (
        <ProdutoModal
          produto={itemEmEdicao as Produto}
          categorias={categorias}
          onClose={() => {
            setModalType(null);
            setItemEmEdicao(null);
          }}
          onSave={handleSaveProduto}
        />
      )}
    </div>
  );
}

export { GerenciadorCardapio };
