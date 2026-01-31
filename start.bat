@echo off
echo Starting EduMentor Application...
echo.

echo Installing backend dependencies...
cd backend
call npm install
echo.

echo Starting backend server...
start "Backend Server" cmd /k "npm start"
echo Backend server starting on http://localhost:5000
echo.

echo Installing frontend dependencies...
cd ..
call npm install
echo.

echo Starting frontend development server...
start "Frontend Server" cmd /k "npm run dev"
echo Frontend server starting on http://localhost:5173
echo.

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause