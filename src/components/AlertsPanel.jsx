import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Bell,
  X
} from 'lucide-react'

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Low Confidence Detection',
      message: 'Fire Extinguisher detection confidence dropped to 67%',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      dismissed: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Model Retrained',
      message: 'AI model successfully retrained with new synthetic data',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      dismissed: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Object Missing',
      message: 'Emergency Phone not detected for 2 minutes',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      dismissed: false
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'Detection accuracy improved to 95.7%',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      dismissed: false
    }
  ])

  const dismissAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ))
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-red-500/50 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10'
      case 'success':
        return 'border-green-500/50 bg-green-500/10'
      default:
        return 'border-blue-500/50 bg-blue-500/10'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = Math.floor((now - timestamp) / 1000 / 60)
    
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  const activeAlerts = alerts.filter(alert => !alert.dismissed)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold">System Alerts</h2>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold"
        >
          {activeAlerts.length}
        </motion.div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type)} relative group`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{alert.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(alert.timestamp)}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dismissAlert(alert.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-400"
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="font-medium">All systems operational</p>
            <p className="text-sm">No active alerts</p>
          </motion.div>
        )}
      </div>

      {/* Alert Summary */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-400">
              {alerts.filter(a => a.type === 'error' && !a.dismissed).length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-400">
              {alerts.filter(a => a.type === 'warning' && !a.dismissed).length}
            </div>
            <div className="text-xs text-gray-400">Warning</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">
              {alerts.filter(a => a.type === 'success' && !a.dismissed).length}
            </div>
            <div className="text-xs text-gray-400">Success</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AlertsPanel