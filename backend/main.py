from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import json
import time
import random
from datetime import datetime
from typing import List, Dict, Any
import numpy as np
from PIL import Image
import io
import base64

app = FastAPI(title="AR Safety Mirror API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock YOLOv8 detection classes
SAFETY_OBJECTS = [
    "Fire Extinguisher",
    "Oxygen Tank", 
    "Nitrogen Tank",
    "Fire Alarm",
    "First Aid Box",
    "Safety Switch Panel",
    "Emergency Phone"
]

# Global state
connected_clients: List[WebSocket] = []
detection_active = False
model_metrics = {
    "accuracy": 95.7,
    "confidence": 87.3,
    "fps": 24,
    "objects_detected": 12,
    "alerts_today": 3
}

class DetectionResult:
    def __init__(self, class_name: str, confidence: float, bbox: List[int]):
        self.class_name = class_name
        self.confidence = confidence
        self.bbox = bbox  # [x, y, width, height]
        self.timestamp = datetime.now()

def mock_yolo_detection(image_data: bytes = None) -> List[DetectionResult]:
    """Mock YOLOv8 detection function with stable results"""
    detections = []
    
    # Predefined stable detections for consistent demo
    stable_objects = [
        {"class": "Fire Extinguisher", "confidence": 0.94, "bbox": [120, 80, 80, 120]},
        {"class": "Oxygen Tank", "confidence": 0.87, "bbox": [300, 150, 60, 100]},
        {"class": "First Aid Box", "confidence": 0.92, "bbox": [450, 200, 70, 50]},
        {"class": "Safety Switch Panel", "confidence": 0.89, "bbox": [200, 300, 40, 60]},
        {"class": "Emergency Phone", "confidence": 0.85, "bbox": [380, 120, 45, 65]},
        {"class": "Fire Alarm", "confidence": 0.91, "bbox": [500, 80, 35, 40]}
    ]
    
    # Add slight variations for realism
    for obj in stable_objects:
        confidence = obj["confidence"] + random.uniform(-0.05, 0.05)
        confidence = max(0.75, min(0.98, confidence))
        
        bbox = obj["bbox"].copy()
        # Add minimal jitter for realism
        bbox[0] += random.randint(-3, 3)
        bbox[1] += random.randint(-3, 3)
        
        detections.append(DetectionResult(obj["class"], confidence, bbox))
    
    return detections

def generate_synthetic_data(object_class: str, num_samples: int = 100) -> Dict[str, Any]:
    """Mock Falcon synthetic data generation"""
    return {
        "status": "success",
        "object_class": object_class,
        "samples_generated": num_samples,
        "variations": ["lighting", "rotation", "occlusion", "noise"],
        "generation_time": f"{random.uniform(2.5, 8.3):.1f}s"
    }

def retrain_model(synthetic_data: Dict[str, Any]) -> Dict[str, Any]:
    """Mock model retraining function"""
    # Simulate training time
    training_time = random.uniform(600, 1200)  # 10-20 minutes
    
    # Mock performance improvement
    old_map = model_metrics["accuracy"]
    improvement = random.uniform(1.0, 4.0)
    new_map = min(99.0, old_map + improvement)
    
    # Update global metrics
    model_metrics["accuracy"] = new_map
    
    return {
        "status": "completed",
        "training_time": f"{training_time/60:.1f}m",
        "metrics": {
            "mAP_before": old_map,
            "mAP_after": new_map,
            "improvement": improvement,
            "precision": random.uniform(88.0, 96.0),
            "recall": random.uniform(85.0, 94.0),
            "f1_score": random.uniform(87.0, 95.0)
        },
        "epochs": random.randint(15, 25),
        "learning_rate": 0.001,
        "samples_used": synthetic_data.get("samples_generated", 0)
    }

@app.get("/")
async def root():
    return {"message": "AR Safety Mirror API", "status": "active"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": True,
        "detection_active": detection_active
    }

@app.post("/api/predict")
async def predict_objects(file: UploadFile = File(...)):
    """Process uploaded image for object detection"""
    try:
        # Read image data
        image_data = await file.read()
        
        # Simulate processing delay for realism
        await asyncio.sleep(0.5)
        
        # Mock detection processing with stable results
        detections = mock_yolo_detection(image_data)
        
        # Format response
        results = []
        for det in detections:
            results.append({
                "id": len(results) + 1,
                "class": det.class_name,
                "confidence": round(det.confidence, 3),
                "bbox": det.bbox,
                "timestamp": det.timestamp.isoformat()
            })
        
        # Update global metrics
        model_metrics["objects_detected"] = len(results)
        model_metrics["confidence"] = sum(det.confidence for det in detections) / len(detections) * 100
        
        return {
            "status": "success",
            "detections": results,
            "processing_time": f"{random.uniform(0.08, 0.12):.3f}s",
            "image_size": len(image_data),
            "model_version": "YOLOv8n-safety-v1.2",
            "total_objects": len(results)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

@app.post("/api/resimulate")
async def trigger_resimulation(request: Dict[str, Any]):
    """Trigger Falcon synthetic data generation"""
    try:
        object_class = request.get("object_class", "Fire Extinguisher")
        num_samples = request.get("num_samples", 100)
        
        # Mock synthetic data generation
        result = generate_synthetic_data(object_class, num_samples)
        
        return {
            "status": "success",
            "message": "Synthetic data generation started",
            "result": result
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resimulation failed: {str(e)}")

@app.post("/api/retrain")
async def trigger_retraining(request: Dict[str, Any]):
    """Trigger model retraining with new synthetic data"""
    try:
        # Mock synthetic data
        synthetic_data = request.get("synthetic_data", {"samples_generated": 1000})
        
        # Mock retraining process
        result = retrain_model(synthetic_data)
        
        # Broadcast update to connected clients
        update_message = {
            "type": "retrain_complete",
            "data": result
        }
        
        for client in connected_clients:
            try:
                await client.send_text(json.dumps(update_message))
            except:
                pass
        
        return {
            "status": "success",
            "message": "Model retraining completed",
            "result": result
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retraining failed: {str(e)}")

@app.get("/api/metrics")
async def get_metrics():
    """Get current model performance metrics"""
    return {
        "status": "success",
        "metrics": model_metrics,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/logs")
async def get_training_logs():
    """Get training history logs"""
    # Mock training logs
    logs = []
    for i in range(5):
        log_time = datetime.now().timestamp() - (i * 3600 * 6)  # 6 hours apart
        logs.append({
            "id": i + 1,
            "timestamp": datetime.fromtimestamp(log_time).isoformat(),
            "status": random.choice(["completed", "completed", "completed", "failed"]),
            "trigger": random.choice(["Low Confidence Alert", "Scheduled Retraining", "Manual Trigger", "Drift Detection"]),
            "duration": f"{random.randint(8, 25)}m {random.randint(10, 59)}s",
            "improvement": round(random.uniform(0.5, 4.0), 1) if random.random() > 0.2 else 0,
            "metrics": {
                "mAP": {"before": round(random.uniform(85, 95), 1), "after": round(random.uniform(90, 98), 1)},
                "precision": {"before": round(random.uniform(82, 92), 1), "after": round(random.uniform(88, 96), 1)},
                "recall": {"before": round(random.uniform(80, 90), 1), "after": round(random.uniform(86, 94), 1)},
                "f1Score": {"before": round(random.uniform(81, 91), 1), "after": round(random.uniform(87, 95), 1)}
            },
            "syntheticSamples": random.randint(800, 2500),
            "epochs": random.randint(12, 25),
            "learningRate": round(random.uniform(0.0005, 0.002), 4)
        })
    
    return {
        "status": "success",
        "logs": logs
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await websocket.accept()
    connected_clients.append(websocket)
    
    try:
        while True:
            # Send periodic updates
            if detection_active:
                # Mock real-time detection data
                detections = mock_yolo_detection()
                
                detection_data = {
                    "type": "detection_update",
                    "data": {
                        "detections": [
                            {
                                "class": det.class_name,
                                "confidence": round(det.confidence, 3),
                                "bbox": det.bbox,
                                "timestamp": det.timestamp.isoformat()
                            }
                            for det in detections
                        ],
                        "metrics": model_metrics,
                        "timestamp": datetime.now().isoformat()
                    }
                }
                
                await websocket.send_text(json.dumps(detection_data))
            
            # Send metrics update
            metrics_update = {
                "type": "metrics_update", 
                "data": {
                    **model_metrics,
                    "timestamp": datetime.now().isoformat()
                }
            }
            
            await websocket.send_text(json.dumps(metrics_update))
            
            # Wait before next update
            await asyncio.sleep(2)
            
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

@app.post("/api/detection/start")
async def start_detection():
    """Start real-time detection"""
    global detection_active
    detection_active = True
    
    # Broadcast to all clients
    message = {
        "type": "detection_started",
        "data": {"status": "active", "timestamp": datetime.now().isoformat()}
    }
    
    for client in connected_clients:
        try:
            await client.send_text(json.dumps(message))
        except:
            pass
    
    return {"status": "success", "message": "Detection started"}

@app.post("/api/detection/stop")
async def stop_detection():
    """Stop real-time detection"""
    global detection_active
    detection_active = False
    
    # Broadcast to all clients
    message = {
        "type": "detection_stopped", 
        "data": {"status": "inactive", "timestamp": datetime.now().isoformat()}
    }
    
    for client in connected_clients:
        try:
            await client.send_text(json.dumps(message))
        except:
            pass
    
    return {"status": "success", "message": "Detection stopped"}

@app.post("/api/detection/frame")
async def process_frame(file: UploadFile = File(...)):
    """Process single frame from webcam for real-time detection"""
    try:
        # Read frame data
        frame_data = await file.read()
        
        # Fast processing for real-time
        detections = mock_yolo_detection(frame_data)
        
        # Format response for real-time use
        results = []
        for det in detections:
            results.append({
                "id": len(results) + 1,
                "class": det.class_name,
                "confidence": round(det.confidence, 3),
                "bbox": det.bbox,
                "timestamp": det.timestamp.isoformat()
            })
        
        return {
            "status": "success",
            "detections": results,
            "frame_id": int(time.time() * 1000),
            "processing_time": f"{random.uniform(0.02, 0.05):.3f}s"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Frame processing failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )