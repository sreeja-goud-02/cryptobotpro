import React, { useState } from 'react';
import { useTradingBot } from './hooks/useTradingBot';
import TradingHeader from './components/TradingHeader';
import MarketData from './components/MarketData';
import OrderForm from './components/OrderForm';
import OrderBook from './components/OrderBook';
import LogViewer from './components/LogViewer';
import BotConfig from './components/BotConfig';

function App() {
  const {
    orders,
    positions,
    balances,
    logs,
    marketData,
    botConfig,
    placeOrder,
    cancelOrder,
    updateBotConfig,
    addLog,
  } = useTradingBot();

  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  const totalBalance = balances.reduce((sum, balance) => sum + balance.balance, 0);
  const totalPnl = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalPnlPercent = totalBalance > 0 ? (totalPnl / totalBalance) * 100 : 0;
  const activeOrders = orders.filter(order => order.status === 'NEW').length;
  const currentPrice = marketData.find(m => m.symbol === selectedSymbol)?.price || 0;

  const handleToggleBot = () => {
    updateBotConfig({ enabled: !botConfig.enabled });
    addLog(
      'INFO',
      `Trading bot ${!botConfig.enabled ? 'started' : 'stopped'}`,
      { previousState: botConfig.enabled }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <TradingHeader
        totalBalance={totalBalance}
        totalPnl={totalPnl}
        totalPnlPercent={totalPnlPercent}
        activeOrders={activeOrders}
        botEnabled={botConfig.enabled}
        onToggleBot={handleToggleBot}
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Market Data and Order Form */}
          <div className="space-y-6">
            <MarketData
              marketData={marketData}
              selectedSymbol={selectedSymbol}
              onSymbolSelect={setSelectedSymbol}
            />
            
            <OrderForm
              selectedSymbol={selectedSymbol}
              currentPrice={currentPrice}
              onPlaceOrder={placeOrder}
            />
            
            <BotConfig
              config={botConfig}
              onUpdateConfig={updateBotConfig}
            />
          </div>

          {/* Middle Column - Order Book */}
          <div>
            <OrderBook
              orders={orders}
              onCancelOrder={cancelOrder}
            />
          </div>

          {/* Right Column - Logs */}
          <div>
            <LogViewer logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;