import { Cardapio } from '@/types/cardapio.types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { List } from 'antd';

interface CardapioListProps {
  cardapios: Cardapio[];
  onEdit: (cardapio: Cardapio) => void;
  onDelete: (id: string) => void;
  onToggleAtivo: (id: string) => void;
}

export function CardapioList({ cardapios, onEdit, onDelete, onToggleAtivo }: CardapioListProps) {
  return (
    <>
      <List className="bg-white shadow rounded-sm px-4">
        {cardapios.map((cardapio) => (
          <List.Item key={cardapio.id}>
            <List.Item.Meta title={cardapio.nome} description={cardapio.descricao} />
            <div className="flex items-center gap-2">
              <button onClick={() => onEdit(cardapio)}>
                <EditOutlined className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(cardapio.id)}>
                <DeleteOutlined className="h-5 w-5" />
              </button>
            </div>
          </List.Item>
        ))}
      </List>
    </>
    // <div className="bg-white shadow rounded-sm">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead className="bg-gray-50">
    //       <tr>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Nome
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Ações
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {cardapios.map((cardapio) => (
    //         <tr key={cardapio.id}>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             <div className="text-sm font-medium text-gray-900">{cardapio.nome}</div>
    //           </td>

    //           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
    //             <button
    //               onClick={() => onEdit(cardapio)}
    //               className="text-indigo-600 hover:text-indigo-900"
    //             >
    //               <PencilIcon className="h-5 w-5" />
    //             </button>
    //             <button
    //               onClick={() => onDelete(cardapio.id)}
    //               className="text-red-600 hover:text-red-900"
    //             >
    //               <TrashIcon className="h-5 w-5" />
    //             </button>
    //             <button
    //               onClick={() => onToggleAtivo(cardapio.id)}
    //               className={`${
    //                 cardapio.ativo ? 'text-red-600' : 'text-green-600'
    //               } hover:opacity-75`}
    //             >
    //               {cardapio.ativo ? 'Desativar' : 'Ativar'}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
