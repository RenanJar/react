import { useState, useEffect } from 'react';
import { useCardapio } from '@/hooks/useCardapio';
import { CardapioList } from './components/CardapioList';
import { CardapioModal } from './components/CardapioModal';
import { Cardapio } from '@/types/cardapio.types';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'react-toastify';

export default function GerenciadorCardapio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardapioEmEdicao, setCardapioEmEdicao] = useState<Cardapio | null>(null);

  const {
    cardapios,
    loading,
    carregarCardapios,
    criarCardapio,
    atualizarCardapio,
    excluirCardapio,
  } = useCardapio();

  useEffect(() => {
    carregarCardapios();
  }, [carregarCardapios]);

  const handleSaveCardapio = async (cardapio: Partial<Cardapio>) => {
    try {
      if ('id' in cardapio && cardapio.id) {
        await atualizarCardapio(cardapio.id, cardapio);
        toast.success('Cardápio atualizado com sucesso!');
      } else {
        await criarCardapio(cardapio);
        toast.success('Cardápio criado com sucesso!');
      }
      setModalOpen(false);
      setCardapioEmEdicao(null);
    } catch (error) {
      toast.error('Erro ao salvar cardápio');
    }
  };

  const handleDeleteCardapio = async (id: string) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este cardápio?')) {
        await excluirCardapio(id);
        toast.success('Cardápio excluído com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao excluir cardápio');
    }
  };

  const LayoutBase = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Cardápio</h1>
          <button
            onClick={() => {
              setModalOpen(true);
              setCardapioEmEdicao(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors"
          >
            Novo Cardápio
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (loading && !cardapios.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <LayoutBase>
      <CardapioList
        cardapios={cardapios}
        onEdit={(cardapio) => {
          setCardapioEmEdicao(cardapio);
          setModalOpen(true);
        }}
        onDelete={handleDeleteCardapio}
        onToggleAtivo={async (id) => {
          try {
            toast.success('Status do cardápio atualizado!');
          } catch (error) {
            toast.error('Erro ao atualizar status do cardápio');
          }
        }}
      />

      {modalOpen && (
        <CardapioModal
          cardapio={cardapioEmEdicao || undefined}
          onClose={() => {
            setModalOpen(false);
            setCardapioEmEdicao(null);
          }}
          onSave={handleSaveCardapio}
        />
      )}
    </LayoutBase>
  );
}

export { GerenciadorCardapio };
