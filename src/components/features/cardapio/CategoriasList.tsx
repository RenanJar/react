import { Categoria } from '@/types/cardapio.types';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

interface CategoriasListProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: string) => void;
  onToggleAtivo: (id: string) => void;
}

export function CategoriasList({
  categorias,
  onEdit,
  onDelete,
  onToggleAtivo,
}: CategoriasListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
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
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{categoria.nome}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${categoria.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {categoria.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(categoria)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(categoria.id)}
                  className="text-red-600 hover:text-red-900 mr-4"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToggleAtivo(categoria.id)}
                  className={`${
                    categoria.ativo
                      ? 'text-red-600 hover:text-red-900'
                      : 'text-green-600 hover:text-green-900'
                  }`}
                >
                  {categoria.ativo ? 'Desativar' : 'Ativar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
