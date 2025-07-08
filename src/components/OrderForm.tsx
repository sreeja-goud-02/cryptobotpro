import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Order } from '../types/trading';

interface OrderFormProps {
  selectedSymbol: string;
  currentPrice: number;
  onPlaceOrder: (order: Omit<Order, 'id' | 'timestamp' | 'executedQty' | 'executedPrice' | 'status'>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  selectedSymbol,
  currentPrice,
  onPlaceOrder,
}) => {
  const [orderType, setOrderType] = useState<Order['type']>('MARKET');
  const [side, setSide] = useState<Order['side']>('BUY');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>(currentPrice.toString());
  const [stopPrice, setStopPrice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quantity || parseFloat(quantity) <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    const orderData = {
      symbol: selectedSymbol,
      side,
      type: orderType,
      quantity: parseFloat(quantity),
      price: orderType !== 'MARKET' ? parseFloat(price) : undefined,
      stopPrice: orderType === 'STOP_LIMIT' ? parseFloat(stopPrice) : undefined,
    };

    onPlaceOrder(orderData);
    setQuantity('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Place Order</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Symbol
          </label>
          <input
            type="text"
            value={selectedSymbol}
            readOnly
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Side
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
                  side === 'BUY'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Plus className="w-4 h-4 mr-1" />
                Buy
              </button>
              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
                  side === 'SELL'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Minus className="w-4 h-4 mr-1" />
                Sell
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Order Type
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as Order['type'])}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
              <option value="STOP_LIMIT">Stop Limit</option>
              <option value="OCO">OCO</option>
              <option value="TWAP">TWAP</option>
              <option value="GRID">Grid</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            step="0.00001"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
          />
        </div>

        {orderType !== 'MARKET' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
            />
          </div>
        )}

        {orderType === 'STOP_LIMIT' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stop Price
            </label>
            <input
              type="number"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            side === 'BUY'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Place {side.toLowerCase()} Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;