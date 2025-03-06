import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Produto, Categoria } from '@/types/cardapio.types';

interface ProdutoModalProps {
  produto?: Produto;
  categorias: Categoria[];
  onClose: () => void;
  onSave: (produto: Partial<Produto>) => void;
}

export function ProdutoModal({ produto, categorias, onClose, onSave }: ProdutoModalProps) {
  const [formData, setFormData] = useState({
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    preco: produto?.preco || 0,
    categoriaId: produto?.categoriaId || '',
    imagem: produto?.imagem || '',
    ativo: produto?.ativo ?? true,
    destaque: produto?.destaque ?? false,
    ingredientes: produto?.ingredientes || [''],
    tempoPreparoMinutos: produto?.tempoPreparoMinutos || 30,
  });

  const handleIngredienteChange = (index: number, value: string) => {
    const newIngredientes = [...formData.ingredientes];
    newIngredientes[index] = value;
    setFormData({ ...formData, ingredientes: newIngredientes });
  };

  const addIngrediente = () => {
    setFormData({
      ...formData,
      ingredientes: [...formData.ingredientes, ''],
    });
  };

  const removeIngrediente = (index: number) => {
    const newIngredientes = formData.ingredientes.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredientes: newIngredientes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientesFiltrados = formData.ingredientes.filter((i) => i.trim() !== '');
    onSave({
      ...formData,
      ingredientes: ingredientesFiltrados,
      preco: Number(formData.preco),
      tempoPreparoMinutos: Number(formData.tempoPreparoMinutos),
      ...(produto?.id ? { id: produto.id } : {}),
    });
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-2xl rounded bg-white p-6 w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-medium text-black">
              {produto ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Informações Básicas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempo de Preparo (minutos)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.tempoPreparoMinutos}
                  onChange={(e) =>
                    setFormData({ ...formData, tempoPreparoMinutos: parseInt(e.target.value) })
                  }
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
                className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Ingredientes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredientes</label>
              {formData.ingredientes.map((ingrediente, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ingrediente}
                    onChange={(e) => handleIngredienteChange(index, e.target.value)}
                    className="flex-1 text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Digite um ingrediente"
                  />
                  {formData.ingredientes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngrediente(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngrediente}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Adicionar Ingrediente
              </button>
            </div>

            {/* Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  value={formData.imagem}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  className="flex-1 text-gray-500 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {formData.imagem && (
                  <div className="w-20 h-20 relative">
                    <img
                      src={formData.imagem}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.ativo}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                  className="rounded-sm  border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Produto Ativo</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                  className="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Produto em Destaque</span>
              </label>
            </div>

            {/* Botões */}
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
