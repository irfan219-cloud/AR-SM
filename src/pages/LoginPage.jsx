import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Rocket,
  ArrowLeft,
  Fingerprint,
  Zap,
  Scan,
  CheckCircle,
  AlertCircle,
  User,
  Key
} from 'lucide-react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [securityLevel, setSecurityLevel] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = []
    const starCount = 150
    const scanLines = []

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.7 ? 'violet' : 'cyan'
      })
    }

    // Create scanning lines
    for (let i = 0; i < 3; i++) {
      scanLines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 100,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(star => {
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed *= -1
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        if (star.color === 'violet') {
          ctx.fillStyle = `rgba(139, 92, 246, ${star.opacity})`
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`
        }
        ctx.fill()
      })

      // Draw scanning lines
      scanLines.forEach(line => {
        line.y -= line.speed
        if (line.y < -50) {
          line.y = canvas.height + 50
          line.x = Math.random() * canvas.width
        }

        const gradient = ctx.createLinearGradient(line.x, line.y, line.x + line.width, line.y + 2)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${line.opacity})`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.fillRect(line.x, line.y, line.width, 2)
      })

      // Draw grid pattern
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 100) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Simulate security level calculation
    let level = 0
    if (formData.email.includes('@')) level += 25
    if (formData.email.includes('arsafety') || formData.email.includes('demo')) level += 25
    if (formData.password.length > 3) level += 25
    if (formData.password.length > 6) level += 25
    setSecurityLevel(level)
  }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setIsScanning(true)

    // Simulate biometric scanning
    toast.success('Initiating biometric scan...')

    try {
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const success = await login(formData.email, formData.password)
      if (success) {
        toast.success('🚀 Access Granted - Welcome to AR-SM')
        navigate('/dashboard')
      } else {
        toast.error('❌ Access Denied - Invalid Credentials')
      }
    } catch (error) {
      toast.error('🔒 Authentication Failed')
    } finally {
      setLoading(false)
      setIsScanning(false)
    }
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@arsafety.space',
      password: 'demo123'
    })
    toast.success('🎯 Demo credentials loaded')
  }

  const handleQuickAccess = async () => {
    setLoading(true)
    setIsScanning(true)
    toast.success('🔍 Quick Access Authentication...')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const success = await login('demo@arsafety.space', 'demo123')
      if (success) {
        toast.success('⚡ Quick Access Granted')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Quick Access Failed')
    } finally {
      setLoading(false)
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f2e 30%, #0f1419 70%, #0a0f1c 100%)'
    }}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* AI-Powered Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-md border border-violet-400/30 rounded-full px-4 py-2 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-violet-400" />
          <span className="text-violet-300 text-sm font-semibold">AI-Powered Safety Monitoring</span>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6"
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            AR-SM
          </span>
        </motion.button>

        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Secure Access to
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AR-SM System
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              Advanced biometric authentication for space station safety monitoring.
              <span className="text-violet-400 font-semibold">Enterprise-grade security.</span>
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-xl rounded-2xl border border-slate-600/30 p-8"
            style={{
              background: 'rgba(30, 41, 59, 0.4)'
            }}
          >
            {/* Security Level Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Security Level</span>
                <span className="text-sm text-violet-400">{securityLevel}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${securityLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-white placeholder-slate-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Key className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-white placeholder-slate-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Biometric Scanning Animation */}
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-violet-500/20 border border-violet-500/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Scan className="w-6 h-6 text-violet-400" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-semibold text-violet-300">Biometric Scan in Progress</div>
                      <div className="text-xs text-slate-400">Analyzing authentication patterns...</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-violet-700 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-violet-500/50 shadow-lg shadow-violet-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Launch Dashboard</span>
                  </div>
                )}
              </motion.button>
            </form>

            {/* Quick Access Options */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-slate-600"></div>
                <span className="px-4 text-sm text-slate-400">Quick Access</span>
                <div className="flex-1 h-px bg-slate-600"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={handleDemoLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg font-medium text-slate-300 hover:border-violet-500/50 transition-all flex items-center justify-center space-x-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Demo</span>
                </motion.button>

                <motion.button
                  onClick={handleQuickAccess}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg font-medium text-slate-300 hover:border-cyan-500/50 transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Quick</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Security Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="relative backdrop-blur-xl rounded-2xl border border-slate-600/30 p-8 shadow-2xl" style={{
            background: 'rgba(30, 41, 59, 0.4)'
          }}>
            {/* Security Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="text-sm text-slate-400">Security Monitor</div>
            </div>

            {/* Biometric Scanner Visualization */}
            <div className="relative bg-slate-900/80 rounded-lg aspect-square mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-slate-900/40"></div>

              {/* Scanning Grid */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute border-t border-violet-400/30" style={{
                    top: `${(i + 1) * 12.5}%`,
                    left: 0,
                    right: 0
                  }} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute border-l border-violet-400/30" style={{
                    left: `${(i + 1) * 12.5}%`,
                    top: 0,
                    bottom: 0
                  }} />
                ))}
              </div>

              {/* Central Scanner */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 border-2 border-violet-400 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Scan className="w-12 h-12 text-violet-400" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Scanning Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ width: '20%' }}
              />
            </div>

            {/* Security Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="backdrop-blur-sm rounded-lg p-4 border border-slate-600/30" style={{
                background: 'rgba(30, 41, 59, 0.3)'
              }}>
                <div className="text-2xl font-bold text-emerald-400">256-bit</div>
                <div className="text-sm text-slate-400">Encryption</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-4 border border-slate-600/30" style={{
                background: 'rgba(30, 41, 59, 0.3)'
              }}>
                <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-600/30">
                <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Encrypted</p>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-600/30">
                <Eye className="w-6 h-6 text-violet-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Monitored</p>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-600/30">
                <Lock className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Secured</p>
              </div>
            </div>

            {/* Holographic Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 rounded-2xl pointer-events-none"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex items-center space-x-2 text-sm text-slate-400 backdrop-blur-md bg-slate-800/30 px-4 py-2 rounded-full border border-slate-600/30">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-emerald-400 rounded-full"
          />
          <span>All security systems operational</span>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage