@echo off
echo Starting AR Safety Mirror System...
echo.

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
call pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting backend server...
start "AR Safety Mirror Backend" cmd /k "python main.py"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

cd ..
echo Starting frontend development server...
start "AR Safety Mirror Frontend" cmd /k "npm run dev"

echo.
echo AR Safety Mirror is starting up!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul