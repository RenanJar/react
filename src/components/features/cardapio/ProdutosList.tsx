import { Produto, Categoria } from '@/types/cardapio.types';
import { PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProdutosListProps {
  produtos: Produto[];
  categorias: Categoria[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: string) => void;
  onToggleAtivo: (id: string) => void;
  onToggleDestaque: (id: string) => void;
}

export function ProdutosList({
  produtos,
  categorias,
  onEdit,
  onDelete,
  onToggleAtivo,
  onToggleDestaque,
}: ProdutosListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {produto.imagem && (
                    <div className="flex-shrink-0 h-10 w-10 mr-4">
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src={produto.imagem}
                        alt={produto.nome}
                        width={40}
                        height={40}
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                    <div className="text-sm text-gray-500">{produto.descricao}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {categorias.find((c) => c.id === produto.categoriaId)?.nome}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">R$ {produto.preco.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${produto.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {produto.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button
                  onClick={() => onEdit(produto)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(produto.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToggleDestaque(produto.id)}
                  className={`${
                    produto.destaque ? 'text-yellow-500' : 'text-gray-400'
                  } hover:text-yellow-600`}
                >
                  <StarIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToggleAtivo(produto.id)}
                  className={`${
                    produto.ativo ? 'text-red-600' : 'text-green-600'
                  } hover:opacity-75`}
                >
                  {produto.ativo ? 'Desativar' : 'Ativar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
