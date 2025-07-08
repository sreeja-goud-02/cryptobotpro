import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { TradingBotConfig } from '../types/trading';

interface BotConfigProps {
  config: TradingBotConfig;
  onUpdateConfig: (config: Partial<TradingBotConfig>) => void;
}

const BotConfig: React.FC<BotConfigProps> = ({ config, onUpdateConfig }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [formData, setFormData] = useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setShowConfig(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Bot Configuration</h3>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {showConfig ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Strategy
            </label>
            <select
              value={formData.strategy}
              onChange={(e) => setFormData({ ...formData, strategy: e.target.value as TradingBotConfig['strategy'] })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            >
              <option value="GRID">Grid Trading</option>
              <option value="TWAP">TWAP</option>
              <option value="MOMENTUM">Momentum</option>
              <option value="MEAN_REVERSION">Mean Reversion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Risk Level
            </label>
            <select
              value={formData.riskLevel}
              onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as TradingBotConfig['riskLevel'] })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Position Size ($)
            </label>
            <input
              type="number"
              value={formData.maxPositionSize}
              onChange={(e) => setFormData({ ...formData, maxPositionSize: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={formData.stopLoss}
                onChange={(e) => setFormData({ ...formData, stopLoss: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Take Profit (%)
              </label>
              <input
                type="number"
                value={formData.takeProfit}
                onChange={(e) => setFormData({ ...formData, takeProfit: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Strategy:</span>
            <span className="text-white font-medium">{config.strategy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Risk Level:</span>
            <span className={`font-medium ${
              config.riskLevel === 'LOW' ? 'text-green-400' :
              config.riskLevel === 'MEDIUM' ? 'text-yellow-400' :
              'text-red-400'
            }`}>{config.riskLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Max Position:</span>
            <span className="text-white font-mono">${config.maxPositionSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Stop Loss:</span>
            <span className="text-red-400 font-mono">{config.stopLoss}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Take Profit:</span>
            <span className="text-green-400 font-mono">{config.takeProfit}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotConfig;