import React from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Eye,
  Activity,
  Brain
} from 'lucide-react'

const MetricsPanel = ({ metrics, expanded = false }) => {
  // Mock data for charts
  const accuracyData = [
    { time: '00:00', accuracy: 94.2, confidence: 85.1 },
    { time: '04:00', accuracy: 95.1, confidence: 87.3 },
    { time: '08:00', accuracy: 94.8, confidence: 86.9 },
    { time: '12:00', accuracy: 95.7, confidence: 88.2 },
    { time: '16:00', accuracy: 95.3, confidence: 87.8 },
    { time: '20:00', accuracy: 95.9, confidence: 89.1 },
    { time: '24:00', accuracy: 95.7, confidence: 87.3 }
  ]

  const detectionData = [
    { object: 'Fire Extinguisher', count: 24, confidence: 94.2 },
    { object: 'Oxygen Tank', count: 18, confidence: 87.3 },
    { object: 'First Aid Box', count: 12, confidence: 92.1 },
    { object: 'Safety Switch', count: 8, confidence: 89.4 },
    { object: 'Emergency Phone', count: 6, confidence: 91.7 }
  ]

  const performanceData = [
    { name: 'Precision', value: 95.7, color: '#10b981' },
    { name: 'Recall', value: 92.3, color: '#3b82f6' },
    { name: 'F1-Score', value: 93.9, color: '#8b5cf6' },
    { name: 'mAP@0.5', value: 94.1, color: '#f59e0b' }
  ]

  const MetricCard = ({ icon, title, value, unit, trend, color }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-effect p-6 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          color === 'green' ? 'bg-green-500/20' :
          color === 'blue' ? 'bg-blue-500/20' :
          color === 'yellow' ? 'bg-yellow-500/20' :
          color === 'purple' ? 'bg-purple-500/20' :
          'bg-gray-500/20'
        }`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
            <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
    </motion.div>
  )

  if (!expanded) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-bold flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span>Live Metrics</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          <MetricCard
            icon={<Target className="w-6 h-6 text-green-500" />}
            title="Detection Accuracy"
            value={metrics.accuracy.toFixed(1)}
            unit="%"
            trend={2.3}
            color="green"
          />
          <MetricCard
            icon={<Eye className="w-6 h-6 text-blue-500" />}
            title="Confidence Level"
            value={metrics.confidence.toFixed(1)}
            unit="%"
            trend={1.8}
            color="blue"
          />
          <MetricCard
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Frame Rate"
            value={metrics.fps}
            unit="FPS"
            trend={-0.5}
            color="yellow"
          />
        </div>

        {/* Mini Chart */}
        <div className="glass-effect p-4 rounded-xl">
          <h3 className="text-sm font-semibold mb-3">24h Performance</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={accuracyData}>
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3">
        <Brain className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold gradient-text">Analytics Dashboard</h1>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Target className="w-6 h-6 text-green-500" />}
          title="Detection Accuracy"
          value={metrics.accuracy.toFixed(1)}
          unit="%"
          trend={2.3}
          color="green"
        />
        <MetricCard
          icon={<Eye className="w-6 h-6 text-blue-500" />}
          title="Confidence Level"
          value={metrics.confidence.toFixed(1)}
          unit="%"
          trend={1.8}
          color="blue"
        />
        <MetricCard
          icon={<Zap className="w-6 h-6 text-yellow-500" />}
          title="Frame Rate"
          value={metrics.fps}
          unit="FPS"
          trend={-0.5}
          color="yellow"
        />
        <MetricCard
          icon={<Activity className="w-6 h-6 text-purple-500" />}
          title="Objects Detected"
          value={metrics.objectsDetected}
          unit="items"
          trend={5.2}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                stackId="2"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Detection Distribution */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Object Detection Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={detectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="object" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Model Performance Metrics */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {performanceData.map((metric, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: metric.color }}
                />
                <span className="text-sm">{metric.name}: {metric.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Activity */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Real-time Activity</h3>
          <div className="space-y-4">
            {detectionData.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 glass-effect rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                  <span className="font-medium">{item.object}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.count} detected</div>
                  <div className="text-xs text-gray-400">{item.confidence}% confidence</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MetricsPanel