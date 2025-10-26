import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Download,
  Play,
  Database,
  Zap
} from 'lucide-react'

const RetrainLogs = () => {
  const [selectedLog, setSelectedLog] = useState(null)
  const [filter, setFilter] = useState('all')

  const retrainLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      trigger: 'Low Confidence Alert',
      duration: '12m 34s',
      improvement: 2.3,
      metrics: {
        mAP: { before: 92.4, after: 94.7 },
        precision: { before: 89.2, after: 91.8 },
        recall: { before: 87.6, after: 90.1 },
        f1Score: { before: 88.4, after: 90.9 }
      },
      syntheticSamples: 1250,
      epochs: 15,
      learningRate: 0.001
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'completed',
      trigger: 'Scheduled Retraining',
      duration: '18m 42s',
      improvement: 1.8,
      metrics: {
        mAP: { before: 90.6, after: 92.4 },
        precision: { before: 87.8, after: 89.2 },
        recall: { before: 85.9, after: 87.6 },
        f1Score: { before: 86.8, after: 88.4 }
      },
      syntheticSamples: 2100,
      epochs: 20,
      learningRate: 0.0008
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'failed',
      trigger: 'Manual Trigger',
      duration: '3m 15s',
      improvement: 0,
      error: 'Insufficient synthetic data generated',
      syntheticSamples: 0,
      epochs: 0,
      learningRate: 0.001
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'completed',
      trigger: 'Drift Detection',
      duration: '15m 28s',
      improvement: 3.1,
      metrics: {
        mAP: { before: 87.5, after: 90.6 },
        precision: { before: 84.2, after: 87.8 },
        recall: { before: 82.8, after: 85.9 },
        f1Score: { before: 83.5, after: 86.8 }
      },
      syntheticSamples: 1800,
      epochs: 18,
      learningRate: 0.0012
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/50 bg-green-500/10'
      case 'failed':
        return 'border-red-500/50 bg-red-500/10'
      case 'running':
        return 'border-blue-500/50 bg-blue-500/10'
      default:
        return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleString()
  }

  const filteredLogs = filter === 'all' 
    ? retrainLogs 
    : retrainLogs.filter(log => log.status === filter)

  const triggerRetrain = () => {
    // Simulate triggering a new retraining session
    console.log('Triggering manual retrain...')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-primary-500" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">AI Training Logs</h1>
            <p className="text-gray-400">Model retraining history and performance metrics</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="glass-effect px-4 py-2 rounded-lg border border-white/20 focus:border-primary-500 outline-none"
          >
            <option value="all" className="bg-slate-800">All Status</option>
            <option value="completed" className="bg-slate-800">Completed</option>
            <option value="failed" className="bg-slate-800">Failed</option>
            <option value="running" className="bg-slate-800">Running</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerRetrain}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Trigger Retrain</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {filteredLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedLog(log)}
                className={`glass-effect p-6 rounded-xl cursor-pointer border ${getStatusColor(log.status)} ${
                  selectedLog?.id === log.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <h3 className="font-semibold">Training Session #{log.id}</h3>
                      <p className="text-sm text-gray-400">{log.trigger}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatTime(log.timestamp)}</div>
                    <div className="text-xs text-gray-400">{log.duration}</div>
                  </div>
                </div>

                {log.status === 'completed' && (
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        +{log.improvement}%
                      </div>
                      <div className="text-xs text-gray-400">Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">
                        {log.metrics.mAP.after}%
                      </div>
                      <div className="text-xs text-gray-400">mAP@0.5</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">
                        {log.syntheticSamples}
                      </div>
                      <div className="text-xs text-gray-400">Samples</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">
                        {log.epochs}
                      </div>
                      <div className="text-xs text-gray-400">Epochs</div>
                    </div>
                  </div>
                )}

                {log.status === 'failed' && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-sm text-red-300">{log.error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Database className="w-4 h-4 text-gray-400" />
                      <span>{log.syntheticSamples} samples</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span>LR: {log.learningRate}</span>
                    </div>
                  </div>
                  {log.status === 'completed' && (
                    <div className="flex items-center space-x-1 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{log.improvement}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {selectedLog ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">Training Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Session Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`font-medium ${
                        selectedLog.status === 'completed' ? 'text-green-400' :
                        selectedLog.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span>{selectedLog.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trigger:</span>
                      <span>{selectedLog.trigger}</span>
                    </div>
                  </div>
                </div>

                {selectedLog.status === 'completed' && (
                  <>
                    <div>
                      <h4 className="font-medium mb-2">Performance Metrics</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedLog.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">
                              {key === 'mAP' ? 'mAP@0.5' : key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{value.before}%</span>
                              <span className="text-gray-400">→</span>
                              <span className="text-sm font-semibold text-green-400">
                                {value.after}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Training Parameters</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Synthetic Samples:</span>
                          <span>{selectedLog.syntheticSamples}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Epochs:</span>
                          <span>{selectedLog.epochs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Learning Rate:</span>
                          <span>{selectedLog.learningRate}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedLog.status === 'failed' && (
                  <div>
                    <h4 className="font-medium mb-2 text-red-400">Error Details</h4>
                    <p className="text-sm text-gray-400">{selectedLog.error}</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-2 glass-effect border border-white/30 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Log</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Select a training session to view details</p>
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-4 rounded-xl"
          >
            <h3 className="font-semibold mb-3">Training Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Sessions:</span>
                <span className="font-semibold">{retrainLogs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Success Rate:</span>
                <span className="font-semibold text-green-400">
                  {((retrainLogs.filter(log => log.status === 'completed').length / retrainLogs.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Avg Improvement:</span>
                <span className="font-semibold text-blue-400">
                  +{(retrainLogs.filter(log => log.status === 'completed').reduce((sum, log) => sum + log.improvement, 0) / retrainLogs.filter(log => log.status === 'completed').length).toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default RetrainLogs