import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import DetectionFeed from '../components/DetectionFeed'
import MetricsPanel from '../components/MetricsPanel'
import AlertsPanel from '../components/AlertsPanel'
import RetrainLogs from '../components/RetrainLogs'
import Heatmap from '../components/Heatmap'
import Sidebar from '../components/Sidebar'
import { 
  Shield, 
  Activity, 
  Camera, 
  Brain,
  LogOut,
  Settings,
  Bell,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('detection')
  const [systemStatus, setSystemStatus] = useState('active')
  const [detections, setDetections] = useState([])
  const [metrics, setMetrics] = useState({
    accuracy: 95.7,
    confidence: 87.3,
    fps: 24,
    objectsDetected: 12,
    alertsToday: 3
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        accuracy: Math.max(90, Math.min(99, prev.accuracy + (Math.random() - 0.5) * 2)),
        confidence: Math.max(70, Math.min(95, prev.confidence + (Math.random() - 0.5) * 3)),
        fps: Math.max(20, Math.min(30, prev.fps + (Math.random() - 0.5) * 2)),
        objectsDetected: Math.max(8, Math.min(20, prev.objectsDetected + Math.floor((Math.random() - 0.5) * 3)))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const tabs = [
    { id: 'detection', label: 'Live Detection', icon: <Camera className="w-5 h-5" /> },
    { id: 'metrics', label: 'Analytics', icon: <Activity className="w-5 h-5" /> },
    { id: 'heatmap', label: 'Heatmap', icon: <Zap className="w-5 h-5" /> },
    { id: 'logs', label: 'Training Logs', icon: <Brain className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f2e 30%, #0f1419 70%, #0a0f1c 100%)'
    }}>
      {/* Background Effects */}
      <div className="absolute inset-0 space-grid opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-cyan-500/3"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col relative z-10">
        {/* AI-Powered Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-md border border-violet-400/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-semibold">AI-Powered Safety Monitoring</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect border-b border-white/10 p-6 mt-16"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl blur-lg opacity-50"></div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  AR-SM Dashboard
                </h1>
                <p className="text-sm text-slate-300">Autonomous Space Station Safety Monitor</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status */}
              <motion.div 
                className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg"
                animate={{ 
                  boxShadow: systemStatus === 'active' 
                    ? ['0 0 10px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.8)', '0 0 10px rgba(34, 197, 94, 0.5)']
                    : '0 0 10px rgba(239, 68, 68, 0.5)'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`w-3 h-3 rounded-full ${
                    systemStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-semibold">
                  {systemStatus === 'active' ? 'System Active' : 'System Alert'}
                </span>
              </motion.div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 glass-effect rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 glass-effect p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'detection' && (
              <motion.div
                key="detection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
              >
                <div className="lg:col-span-2">
                  <DetectionFeed metrics={metrics} />
                </div>
                <div className="space-y-6">
                  <AlertsPanel />
                  <MetricsPanel metrics={metrics} />
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <MetricsPanel metrics={metrics} expanded />
              </motion.div>
            )}

            {activeTab === 'heatmap' && (
              <motion.div
                key="heatmap"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Heatmap />
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <RetrainLogs />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Dashboard