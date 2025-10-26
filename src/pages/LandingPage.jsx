import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Shield,
    Eye,
    Zap,
    Brain,
    Rocket,
    Activity,
    ChevronRight,
    Play,
    Monitor,
    Cpu,
    Scan,
    Target
} from 'lucide-react'

const LandingPage = () => {
    const navigate = useNavigate()
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars = []
        const starCount = 200

        // Create stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                opacity: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            })
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw stars with twinkling effect
            stars.forEach(star => {
                star.opacity += star.twinkleSpeed
                if (star.opacity > 1 || star.opacity < 0.1) {
                    star.twinkleSpeed *= -1
                }

                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(147, 197, 253, ${star.opacity})`
                ctx.fill()
            })

            // Draw nebula effect
            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.4, 0,
                canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.6
            )
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
            gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.05)')
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0.02)')

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

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

    const mockDetections = [
        { id: 1, name: 'Fire Extinguisher', confidence: 0.94, x: 15, y: 20, width: 25, height: 35 },
        { id: 2, name: 'Oxygen Tank', confidence: 0.87, x: 60, y: 30, width: 20, height: 40 },
        { id: 3, name: 'First Aid Box', confidence: 0.92, x: 25, y: 65, width: 30, height: 20 },
        { id: 4, name: 'Safety Switch', confidence: 0.89, x: 70, y: 70, width: 15, height: 25 },
        { id: 5, name: 'Emergency Phone', confidence: 0.85, x: 45, y: 45, width: 18, height: 22 },
        { id: 6, name: 'Fire Alarm', confidence: 0.91, x: 80, y: 15, width: 12, height: 15 }
    ]

    return (
        <div className="relative min-h-screen overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                style={{ background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f2e 30%, #0f1419 70%, #0a0f1c 100%)' }}
            />

            {/* AI-Powered Tag */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
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
                className="relative z-10 flex justify-between items-center p-6"
            >
                <div className="flex items-center space-x-3">
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
                </div>

                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                    >
                        Login
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 rounded-lg font-semibold transition-all border border-violet-500/50"
                    >
                        Get Started
                    </motion.button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div className="relative z-10 min-h-screen flex items-center px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Monitor Your
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                Space Station
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                With AI Vision
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-300 leading-relaxed max-w-2xl"
                        >
                            Autonomous AI safety co-pilot that continuously monitors critical equipment
                            and self-learns from synthetic data. <span className="text-violet-400 font-semibold">Zero human labels required.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-700 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 border border-violet-500/50 shadow-lg shadow-violet-500/25"
                            >
                                <Monitor className="w-5 h-5" />
                                <span>Launch Dashboard</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                            >
                                Get Started
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-8 pt-8"
                        >
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    99.9%
                                </motion.div>
                                <div className="text-sm text-gray-400 font-medium">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                >
                                    7
                                </motion.div>
                                <div className="text-sm text-gray-400 font-medium">Equipment Types</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                >
                                    24/7
                                </motion.div>
                                <div className="text-sm text-gray-400 font-medium">Monitoring</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative backdrop-blur-xl rounded-2xl border border-slate-600/30 p-6 shadow-2xl" style={{
                            background: 'rgba(30, 41, 59, 0.4)'
                        }}>
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="text-sm text-slate-400">AR-SM Dashboard</div>
                            </div>

                            {/* Mock Camera Feed */}
                            <div className="relative bg-slate-900/80 rounded-lg aspect-video mb-4 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-slate-900/40"></div>

                                {/* Detection Boxes */}
                                {mockDetections.map((detection) => (
                                    <motion.div
                                        key={detection.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: detection.id * 0.2 }}
                                        className="absolute border-2 border-emerald-400 bg-emerald-400/10 rounded"
                                        style={{
                                            left: `${detection.x}%`,
                                            top: `${detection.y}%`,
                                            width: `${detection.width}%`,
                                            height: `${detection.height}%`
                                        }}
                                    >
                                        <div className="absolute -top-6 left-0 bg-emerald-400 text-black text-xs px-2 py-1 rounded font-semibold">
                                            {detection.name} {(detection.confidence * 100).toFixed(0)}%
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Scanning Line Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    style={{ width: '20%' }}
                                />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="backdrop-blur-sm rounded-lg p-4 border border-slate-600/30" style={{
                                    background: 'rgba(30, 41, 59, 0.3)'
                                }}>
                                    <div className="text-2xl font-bold text-emerald-400">0.85</div>
                                    <div className="text-sm text-slate-400">mAP Score</div>
                                </div>
                                <div className="backdrop-blur-sm rounded-lg p-4 border border-slate-600/30" style={{
                                    background: 'rgba(30, 41, 59, 0.3)'
                                }}>
                                    <div className="text-2xl font-bold text-cyan-400">6/7</div>
                                    <div className="text-sm text-slate-400">Detections</div>
                                </div>
                            </div>

                            {/* Holographic Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 rounded-2xl pointer-events-none"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 pointer-events-none"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Live Activity Indicator */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-8 right-8 z-20"
            >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full flex items-center space-x-2">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                    />
                    <span className="text-sm font-semibold text-white">System Active</span>
                </div>
            </motion.div>
        </div>
    )
}

export default LandingPage