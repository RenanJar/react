import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface DashboardStats {
  pedidosHoje: number;
  vendasHoje: number;
  pedidosPendentes: number;
  tempoPreparo: string;
}

export default function DashboardContent() {
  const { restaurante } = useAuth();
  const [stats] = useState<DashboardStats>({
    pedidosHoje: 45,
    vendasHoje: 2750.0,
    pedidosPendentes: 8,
    tempoPreparo: '35min',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard {'abc teste'}</h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Pedidos Hoje" value={stats.pedidosHoje} icon="📦" color="bg-blue-500" />
          <StatCard
            title="Vendas Hoje"
            value={`R$ ${stats.vendasHoje.toFixed(2)}`}
            icon="💰"
            color="bg-green-500"
          />
          <StatCard
            title="Pedidos Pendentes"
            value={stats.pedidosPendentes}
            icon="⏳"
            color="bg-yellow-500"
          />
          <StatCard
            title="Tempo Médio"
            value={stats.tempoPreparo}
            icon="⏱️"
            color="bg-purple-500"
          />
        </div>

        {/* Seção de Pedidos Ativos */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pedidos Ativos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
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
                <OrderRow
                  orderNumber="#1234"
                  customer="João Silva"
                  items="1x Pizza Grande Margherita"
                  status="Preparando"
                />
                <OrderRow
                  orderNumber="#1235"
                  customer="Maria Santos"
                  items="2x Pizza Média Calabresa"
                  status="Aguardando"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Seção de Pizzas Mais Vendidas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pizzas Mais Vendidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TopPizzaCard name="Margherita" quantity={150} percentage={35} />
            <TopPizzaCard name="Calabresa" quantity={120} percentage={28} />
            <TopPizzaCard name="Portuguesa" quantity={80} percentage={19} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Componentes auxiliares
const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`${color} rounded-full p-3 text-white text-2xl`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const OrderRow = ({
  orderNumber,
  customer,
  items,
  status,
}: {
  orderNumber: string;
  customer: string;
  items: string;
  status: string;
}) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orderNumber}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{items}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <button className="text-indigo-600 hover:text-indigo-900">Ver detalhes</button>
    </td>
  </tr>
);

const TopPizzaCard = ({
  name,
  quantity,
  percentage,
}: {
  name: string;
  quantity: number;
  percentage: number;
}) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h3 className="font-semibold text-lg mb-2">{name}</h3>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{quantity} vendidas</span>
      <span className="text-green-600">{percentage}%</span>
    </div>
    <div className="mt-2 bg-gray-200 rounded-full h-2">
      <div className="bg-green-500 rounded-full h-2" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);
