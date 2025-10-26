import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Thermometer, 
  Eye, 
  MapPin, 
  BarChart3,
  Filter,
  Download
} from 'lucide-react'

const Heatmap = () => {
  const canvasRef = useRef(null)
  const [selectedObject, setSelectedObject] = useState('all')
  const [heatmapData, setHeatmapData] = useState([])

  // Mock heatmap data points
  const mockHeatmapData = [
    { x: 120, y: 80, intensity: 0.9, object: 'Fire Extinguisher', detections: 45 },
    { x: 300, y: 150, intensity: 0.7, object: 'Oxygen Tank', detections: 32 },
    { x: 450, y: 200, intensity: 0.8, object: 'First Aid Box', detections: 28 },
    { x: 200, y: 300, intensity: 0.6, object: 'Safety Switch', detections: 18 },
    { x: 350, y: 100, intensity: 0.5, object: 'Emergency Phone', detections: 12 },
    { x: 180, y: 180, intensity: 0.4, object: 'Fire Alarm', detections: 8 },
    { x: 400, y: 280, intensity: 0.3, object: 'Nitrogen Tank', detections: 6 }
  ]

  const objectTypes = [
    'all',
    'Fire Extinguisher',
    'Oxygen Tank',
    'First Aid Box',
    'Safety Switch',
    'Emergency Phone',
    'Fire Alarm',
    'Nitrogen Tank'
  ]

  useEffect(() => {
    const filteredData = selectedObject === 'all' 
      ? mockHeatmapData 
      : mockHeatmapData.filter(point => point.object === selectedObject)
    
    setHeatmapData(filteredData)
  }, [selectedObject])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < rect.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw heatmap points
    heatmapData.forEach(point => {
      const radius = 60 * point.intensity
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, radius
      )
      
      // Color based on intensity
      const alpha = point.intensity
      if (point.intensity > 0.7) {
        gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha})`) // Red
        gradient.addColorStop(0.5, `rgba(239, 68, 68, ${alpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)')
      } else if (point.intensity > 0.4) {
        gradient.addColorStop(0, `rgba(245, 158, 11, ${alpha})`) // Yellow
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${alpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)')
      } else {
        gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha})`) // Green
        gradient.addColorStop(0.5, `rgba(16, 185, 129, ${alpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw detection point
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [heatmapData])

  const getIntensityColor = (intensity) => {
    if (intensity > 0.7) return 'text-red-400'
    if (intensity > 0.4) return 'text-yellow-400'
    return 'text-green-400'
  }

  const totalDetections = heatmapData.reduce((sum, point) => sum + point.detections, 0)
  const avgIntensity = heatmapData.length > 0 
    ? heatmapData.reduce((sum, point) => sum + point.intensity, 0) / heatmapData.length 
    : 0

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Thermometer className="w-6 h-6 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">Detection Heatmap</h1>
            <p className="text-gray-400">Spatial analysis of safety equipment detection frequency</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedObject}
            onChange={(e) => setSelectedObject(e.target.value)}
            className="glass-effect px-4 py-2 rounded-lg border border-white/20 focus:border-primary-500 outline-none"
          >
            {objectTypes.map(type => (
              <option key={type} value={type} className="bg-slate-800">
                {type === 'all' ? 'All Objects' : type}
              </option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Heatmap Visualization */}
        <div className="lg:col-span-3">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-effect rounded-xl p-6 h-96"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Detection Frequency Map</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>High</span>
                </div>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-full bg-slate-900/50 rounded-lg cursor-crosshair"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>

        {/* Statistics Panel */}
        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-4 rounded-xl"
          >
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Statistics</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-blue-400">{totalDetections}</div>
                <div className="text-xs text-gray-400">Total Detections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {(avgIntensity * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg Intensity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{heatmapData.length}</div>
                <div className="text-xs text-gray-400">Active Zones</div>
              </div>
            </div>
          </motion.div>

          {/* Detection Points List */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-4 rounded-xl"
          >
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Detection Points</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {heatmapData.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 glass-effect rounded-lg text-sm"
                >
                  <div>
                    <div className="font-medium">{point.object}</div>
                    <div className="text-xs text-gray-400">
                      ({point.x}, {point.y})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getIntensityColor(point.intensity)}`}>
                      {(point.intensity * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-400">{point.detections} hits</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-4 rounded-xl"
          >
            <h3 className="font-semibold mb-3">Intensity Scale</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>High Activity</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-red-500 rounded" />
                  <span>70-100%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Medium Activity</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-yellow-500 rounded" />
                  <span>40-70%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Low Activity</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-green-500 rounded" />
                  <span>0-40%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Heatmap