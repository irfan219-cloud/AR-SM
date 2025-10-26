import React from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Activity, 
  Zap, 
  Brain, 
  Shield,
  Upload,
  RefreshCw
} from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'detection', icon: <Camera className="w-5 h-5" />, label: 'Live Feed' },
    { id: 'metrics', icon: <Activity className="w-5 h-5" />, label: 'Analytics' },
    { id: 'heatmap', icon: <Zap className="w-5 h-5" />, label: 'Heatmap' },
    { id: 'logs', icon: <Brain className="w-5 h-5" />, label: 'AI Logs' }
  ]

  const actions = [
    { icon: <Upload className="w-5 h-5" />, label: 'Upload Image', action: 'upload' },
    { icon: <RefreshCw className="w-5 h-5" />, label: 'Retrain Model', action: 'retrain' }
  ]

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 p-6 flex flex-col relative"
      style={{
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)'
      }}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl blur-md opacity-50"></div>
        </motion.div>
        <div>
          <h2 className="font-bold text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AR-SM</h2>
          <p className="text-xs text-slate-400">Control Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-500/25 border border-violet-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Quick Actions
        </h3>
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all border border-slate-600/30 hover:bg-slate-700/30 hover:border-violet-500/30"
            style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* System Status */}
      <div className="mt-auto">
        <div className="p-4 rounded-lg border border-slate-600/30" style={{
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(15px)'
        }}>
          <h4 className="text-sm font-semibold mb-3 text-slate-200">System Health</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">CPU</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: '67%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-slate-300">67%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">GPU</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs text-slate-300">84%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Memory</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <span className="text-xs text-slate-300">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar