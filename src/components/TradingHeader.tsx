import React from 'react';
import { Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface TradingHeaderProps {
  totalBalance: number;
  totalPnl: number;
  totalPnlPercent: number;
  activeOrders: number;
  botEnabled: boolean;
  onToggleBot: () => void;
}

const TradingHeader: React.FC<TradingHeaderProps> = ({
  totalBalance,
  totalPnl,
  totalPnlPercent,
  activeOrders,
  botEnabled,
  onToggleBot,
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">CryptoBot Pro</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Balance:</span>
              <span className="text-white font-mono text-lg">${totalBalance.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {totalPnl >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span className="text-gray-400">PnL:</span>
              <span className={`font-mono text-lg ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalPnl.toFixed(2)} ({totalPnlPercent.toFixed(2)}%)
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Active Orders:</span>
              <span className="text-white font-mono">{activeOrders}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleBot}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              botEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {botEnabled ? 'Stop Bot' : 'Start Bot'}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${botEnabled ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-400">
              {botEnabled ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingHeader;