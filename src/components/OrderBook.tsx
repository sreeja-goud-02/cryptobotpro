import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Order } from '../types/trading';

interface OrderBookProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

const OrderBook: React.FC<OrderBookProps> = ({ orders, onCancelOrder }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'NEW':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'FILLED':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'CANCELED':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'REJECTED':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'NEW':
        return 'text-blue-400';
      case 'FILLED':
        return 'text-green-400';
      case 'CANCELED':
        return 'text-gray-400';
      case 'REJECTED':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Order History</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="font-mono text-sm text-white">{order.symbol}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.side === 'BUY' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {order.side}
                  </span>
                  <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
                    {order.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  {order.status === 'NEW' && (
                    <button
                      onClick={() => onCancelOrder(order.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Quantity:</span>
                  <span className="text-white ml-2 font-mono">{order.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-400">Executed:</span>
                  <span className="text-white ml-2 font-mono">{order.executedQty}</span>
                </div>
                {order.price && (
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white ml-2 font-mono">${order.price.toFixed(2)}</span>
                  </div>
                )}
                {order.executedPrice && (
                  <div>
                    <span className="text-gray-400">Avg Price:</span>
                    <span className="text-white ml-2 font-mono">${order.executedPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                {order.timestamp.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderBook;