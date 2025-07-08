import { useState, useEffect, useCallback } from 'react';
import { Order, Position, Balance, LogEntry, MarketData, TradingBotConfig } from '../types/trading';

export const useTradingBot = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [balances, setBalances] = useState<Balance[]>([
    { asset: 'USDT', balance: 10000, availableBalance: 10000 },
    { asset: 'BTC', balance: 0, availableBalance: 0 },
    { asset: 'ETH', balance: 0, availableBalance: 0 },
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [botConfig, setBotConfig] = useState<TradingBotConfig>({
    enabled: false,
    strategy: 'GRID',
    symbols: ['BTCUSDT', 'ETHUSDT'],
    riskLevel: 'LOW',
    maxPositionSize: 1000,
    stopLoss: 5,
    takeProfit: 10,
  });

  const addLog = useCallback((level: LogEntry['level'], message: string, details?: any) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level,
      message,
      details,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  // Simulate market data updates
  useEffect(() => {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT'];
    const initialData = symbols.map(symbol => ({
      symbol,
      price: Math.random() * 50000 + 1000,
      change24h: (Math.random() - 0.5) * 1000,
      change24hPercent: (Math.random() - 0.5) * 20,
      volume: Math.random() * 1000000,
      high24h: Math.random() * 55000 + 1000,
      low24h: Math.random() * 45000 + 1000,
    }));
    setMarketData(initialData);

    const interval = setInterval(() => {
      setMarketData(prev => prev.map(data => ({
        ...data,
        price: data.price + (Math.random() - 0.5) * 100,
        change24h: data.change24h + (Math.random() - 0.5) * 10,
        change24hPercent: data.change24hPercent + (Math.random() - 0.5) * 0.5,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const placeOrder = useCallback(async (orderData: Omit<Order, 'id' | 'timestamp' | 'executedQty' | 'executedPrice' | 'status'>) => {
    try {
      addLog('INFO', `Placing ${orderData.type} order: ${orderData.side} ${orderData.quantity} ${orderData.symbol}`, orderData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        timestamp: new Date(),
        status: 'NEW',
        executedQty: 0,
      };

      setOrders(prev => [newOrder, ...prev]);
      
      // Simulate order execution
      setTimeout(() => {
        setOrders(prev => prev.map(order => 
          order.id === newOrder.id 
            ? { 
                ...order, 
                status: 'FILLED', 
                executedQty: order.quantity,
                executedPrice: orderData.price || marketData.find(m => m.symbol === orderData.symbol)?.price || 0
              }
            : order
        ));
        addLog('SUCCESS', `Order ${newOrder.id} executed successfully`);
      }, 2000);

      return newOrder;
    } catch (error) {
      addLog('ERROR', `Failed to place order: ${error}`, error);
      throw error;
    }
  }, [addLog, marketData]);

  const cancelOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'CANCELED' }
        : order
    ));
    addLog('INFO', `Order ${orderId} cancelled`);
  }, [addLog]);

  const updateBotConfig = useCallback((config: Partial<TradingBotConfig>) => {
    setBotConfig(prev => ({ ...prev, ...config }));
    addLog('INFO', 'Bot configuration updated', config);
  }, [addLog]);

  return {
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
  };
};