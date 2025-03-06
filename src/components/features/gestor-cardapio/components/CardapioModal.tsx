import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Cardapio } from '@/types/cardapio.types';

interface CardapioModalProps {
  cardapio?: Cardapio;
  onClose: () => void;
  onSave: (cardapio: Partial<Cardapio>) => void;
}

export function CardapioModal({ cardapio, onClose, onSave }: CardapioModalProps) {
  const [nome, setNome] = useState(cardapio?.nome || '');
  const [ativo, setAtivo] = useState(cardapio?.ativo ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      nome,
      ativo,
      ...(cardapio?.id ? { id: cardapio.id } : {}),
    });
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-sm rounded-sm bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-medium text-black">
              {cardapio ? 'Editar Cardápio' : 'Novo Cardápio'}
            </DialogTitle>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-black" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Cardápio
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                  className="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Cardápio Ativo</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-sm hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
