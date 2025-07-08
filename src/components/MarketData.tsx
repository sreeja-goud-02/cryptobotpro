import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../types/trading';

interface MarketDataProps {
  marketData: MarketData[];
  selectedSymbol: string;
  onSymbolSelect: (symbol: string) => void;
}

const MarketDataComponent: React.FC<MarketDataProps> = ({
  marketData,
  selectedSymbol,
  onSymbolSelect,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Market Data</h3>
      <div className="space-y-2">
        {marketData.map((data) => (
          <div
            key={data.symbol}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedSymbol === data.symbol
                ? 'bg-blue-600 bg-opacity-20 border border-blue-500'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onSymbolSelect(data.symbol)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-white font-semibold">{data.symbol}</div>
                <div className="text-sm text-gray-400">
                  Vol: {(data.volume / 1000000).toFixed(2)}M
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-white font-semibold">
                  ${data.price.toFixed(2)}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  data.change24hPercent >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {data.change24hPercent >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{data.change24hPercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketDataComponent;