export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP_LIMIT' | 'OCO' | 'TWAP' | 'GRID';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'NEW' | 'FILLED' | 'PARTIALLY_FILLED' | 'CANCELED' | 'REJECTED';
  timestamp: Date;
  executedQty: number;
  executedPrice?: number;
}

export interface Position {
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercent: number;
  margin: number;
}

export interface Balance {
  asset: string;
  balance: number;
  availableBalance: number;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  message: string;
  details?: any;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  change24hPercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

export interface TradingBotConfig {
  enabled: boolean;
  strategy: 'GRID' | 'TWAP' | 'MOMENTUM' | 'MEAN_REVERSION';
  symbols: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  maxPositionSize: number;
  stopLoss: number;
  takeProfit: number;
}