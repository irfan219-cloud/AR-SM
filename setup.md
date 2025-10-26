# 🚀 AR Safety Mirror - Setup Guide

## Quick Setup (Windows)

### Option 1: Automatic Setup
1. Double-click `run.bat` to automatically install dependencies and start both servers
2. Wait for both frontend and backend to start
3. Open http://localhost:3000 in your browser

### Option 2: Manual Setup

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

## Quick Setup (Linux/Mac)

### Option 1: Automatic Setup
```bash
# Make script executable (Linux/Mac only)
chmod +x run.sh

# Run setup script
./run.sh
```

### Option 2: Manual Setup
Same as Windows manual setup, but use `python3` instead of `python`

## Access Points

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **WebSocket**: ws://localhost:8000/ws

## Demo Credentials

- **Email**: demo@arsafety.space
- **Password**: demo123

## Features to Test

1. **Landing Page**: Animated particles and smooth transitions
2. **Login System**: Use demo credentials or click "Use Demo Access"
3. **Live Detection**: Upload images or use webcam (if available)
4. **Analytics Dashboard**: View real-time metrics and charts
5. **Heatmap**: Spatial analysis of detection patterns
6. **Training Logs**: AI retraining history and performance

## Troubleshooting

### Port Already in Use
- Frontend (3000): Change port in `vite.config.js`
- Backend (8000): Change port in `backend/main.py`

### Dependencies Issues
- Run `npm install` again for frontend
- Run `pip install -r requirements.txt` again for backend

### Camera Access
- Allow camera permissions in browser
- Use image upload if camera not available

## Production Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render/Railway)
```bash
# Deploy backend/ folder to cloud service
# Set environment variables as needed
```

## System Requirements

- **Node.js**: 18.0.0 or higher
- **Python**: 3.8.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **Camera**: Optional for live detection

## Performance Tips

1. **Close unnecessary applications** for better performance
2. **Use Chrome** for best WebRTC camera support
3. **Enable hardware acceleration** in browser settings
4. **Ensure stable internet** for real-time features

## Support

If you encounter any issues:
1. Check the console for error messages
2. Restart both servers
3. Clear browser cache and cookies
4. Ensure all dependencies are installed correctly

---

**🏆 Built for PS1: Duality AI's Space Station Challenge**