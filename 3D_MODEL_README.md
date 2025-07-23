# 3D Model Viewer

This project contains a 3D model viewer that displays GLB files with animation support.

## Quick Start

### Option 1: Python Server (Recommended)
1. Make sure Python is installed on your system
2. Double-click `start_server.bat` or run in PowerShell:
   ```powershell
   python server.py
   ```
3. Your browser should automatically open to `http://localhost:8000/3d.html`

### Option 2: PowerShell HTTP Server
Run this command in PowerShell from the project directory:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000/3d.html` in your browser.

### Option 3: Node.js (if you have Node installed)
```powershell
npx http-server -p 8000 --cors
```
Then open `http://localhost:8000/3d.html` in your browser.

## Controls
- **Left Click + Drag**: Rotate the model
- **Right Click + Drag**: Pan around
- **Mouse Wheel**: Zoom in/out
- **Double Click**: Reset camera view
- **Spacebar**: Toggle animation play/pause
- **R Key**: Reset camera

## Files
- `3d.html` - Main viewer page
- `3d.js` - JavaScript 3D viewer code
- `3d_models/vintage_robot_animated.glb` - Your 3D model
- `server.py` - Python HTTP server
- `start_server.bat` - Windows batch file to start server

## Troubleshooting
If you get CORS errors, make sure you're accessing the files through the HTTP server (http://localhost:8000) and not opening the HTML file directly in the browser.
