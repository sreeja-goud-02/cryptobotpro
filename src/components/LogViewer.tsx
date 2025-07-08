import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { LogEntry } from '../types/trading';

interface LogViewerProps {
  logs: LogEntry[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'INFO':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'ERROR':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'SUCCESS':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'INFO':
        return 'text-blue-400';
      case 'WARNING':
        return 'text-yellow-400';
      case 'ERROR':
        return 'text-red-400';
      case 'SUCCESS':
        return 'text-green-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">System Logs</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No logs yet</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-gray-900 rounded p-3 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-start space-x-2">
                {getLogIcon(log.level)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-400 text-xs">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.level === 'INFO' ? 'bg-blue-600' :
                      log.level === 'WARNING' ? 'bg-yellow-600' :
                      log.level === 'ERROR' ? 'bg-red-600' :
                      'bg-green-600'
                    } text-white`}>
                      {log.level}
                    </span>
                  </div>
                  <p className={`${getLogColor(log.level)} leading-relaxed`}>
                    {log.message}
                  </p>
                  {log.details && (
                    <details className="mt-2">
                      <summary className="text-gray-400 cursor-pointer hover:text-gray-300">
                        Show details
                      </summary>
                      <pre className="text-gray-400 text-xs mt-1 overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogViewer;