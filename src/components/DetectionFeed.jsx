import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Webcam from 'react-webcam'
import { 
  Camera, 
  Upload, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize,
  Download
} from 'lucide-react'
import toast from 'react-hot-toast'

const DetectionFeed = ({ metrics }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [detections, setDetections] = useState([])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [useWebcam, setUseWebcam] = useState(true)

  // Stable detection objects for demo
  const stableDetections = [
    { id: 1, class: 'Fire Extinguisher', baseConfidence: 0.94, baseX: 120, baseY: 80, width: 80, height: 120 },
    { id: 2, class: 'Oxygen Tank', baseConfidence: 0.87, baseX: 300, baseY: 150, width: 60, height: 100 },
    { id: 3, class: 'First Aid Box', baseConfidence: 0.92, baseX: 450, baseY: 200, width: 70, height: 50 },
    { id: 4, class: 'Safety Switch', baseConfidence: 0.89, baseX: 200, baseY: 300, width: 40, height: 60 },
    { id: 5, class: 'Emergency Phone', baseConfidence: 0.85, baseX: 380, baseY: 120, width: 45, height: 65 },
    { id: 6, class: 'Fire Alarm', baseConfidence: 0.91, baseX: 500, baseY: 80, width: 35, height: 40 }
  ]

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        // Simulate stable real-time detection updates with minimal jitter
        setDetections(stableDetections.map(det => ({
          ...det,
          confidence: Math.max(0.75, Math.min(0.98, det.baseConfidence + (Math.random() - 0.5) * 0.05)),
          x: det.baseX + (Math.random() - 0.5) * 3, // Reduced jitter for stability
          y: det.baseY + (Math.random() - 0.5) * 3
        })))
      }, 500) // Faster updates for smoother experience

      return () => clearInterval(interval)
    }
  }, [isRecording])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setUseWebcam(false)
        
        // Simulate AI processing delay
        toast.success('Processing image with AI...')
        setTimeout(() => {
          // Detect objects based on image content (simulated)
          const detectedObjects = stableDetections.map(det => ({
            ...det,
            confidence: det.baseConfidence + (Math.random() - 0.5) * 0.1,
            x: det.baseX,
            y: det.baseY
          }))
          setDetections(detectedObjects)
          toast.success(`Detected ${detectedObjects.length} safety objects`)
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      toast.success('AI Detection System Activated')
      // Initialize with stable detections
      setDetections(stableDetections.map(det => ({
        ...det,
        confidence: det.baseConfidence,
        x: det.baseX,
        y: det.baseY
      })))
    } else {
      setDetections([])
      toast.success('Detection System Deactivated')
    }
  }

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      // Process image for detection
      toast.success('Image captured and processed')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Camera className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-xl font-bold">Live Detection Feed</h2>
            <p className="text-sm text-gray-400">Real-time safety equipment monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUseWebcam(!useWebcam)}
            className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
            title="Toggle Camera/Upload"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
              title="Upload Image"
            >
              <Upload className="w-5 h-5" />
            </motion.div>
          </label>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleRecording}
            className={`p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Video Feed */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
        {useWebcam ? (
          <Webcam
            ref={webcamRef}
            className="w-full h-full object-cover"
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user"
            }}
          />
        ) : uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt="Uploaded" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Upload an image or enable camera</p>
            </div>
          </div>
        )}

        {/* Detection Overlays */}
        {detections.map((detection) => (
          <motion.div
            key={detection.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute border-2 border-cyan-400 bg-cyan-400/10 rounded backdrop-blur-sm"
            style={{
              left: `${detection.x}px`,
              top: `${detection.y}px`,
              width: `${detection.width}px`,
              height: `${detection.height}px`,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}
          >
            <motion.div 
              className="absolute -top-7 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs px-2 py-1 rounded font-semibold whitespace-nowrap"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {detection.class} {(detection.confidence * 100).toFixed(1)}%
            </motion.div>
            
            {/* Corner indicators */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400"></div>
          </motion.div>
        ))}

        {/* Recording Indicator */}
        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-sm font-semibold">LIVE</span>
          </motion.div>
        )}

        {/* FPS Counter */}
        <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full">
          <span className="text-sm font-semibold">{metrics.fps} FPS</span>
        </div>
      </div>

      {/* Detection Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-effect p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{detections.length}</div>
          <div className="text-xs text-gray-400">Objects Detected</div>
        </div>
        <div className="glass-effect p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">
            {detections.length > 0 ? (detections.reduce((acc, det) => acc + det.confidence, 0) / detections.length * 100).toFixed(1) : 0}%
          </div>
          <div className="text-xs text-gray-400">Avg Confidence</div>
        </div>
        <div className="glass-effect p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">{metrics.fps}</div>
          <div className="text-xs text-gray-400">Frame Rate</div>
        </div>
        <div className="glass-effect p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">
            {isRecording ? 'ON' : 'OFF'}
          </div>
          <div className="text-xs text-gray-400">Detection Status</div>
        </div>
      </div>
    </motion.div>
  )
}

export default DetectionFeed