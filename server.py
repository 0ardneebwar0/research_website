#!/usr/bin/env python3
"""
Simple HTTP Server for 3D Model Viewer
Run this script to serve your 3D model files locally
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def main():
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    PORT = 8000
    
    class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            # Add CORS headers to allow loading of GLB files
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
    
    # Try to find an available port
    for port in range(PORT, PORT + 10):
        try:
            with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
                print(f"🚀 Starting server at http://localhost:{port}")
                print(f"📁 Serving files from: {os.getcwd()}")
                print(f"🎮 Open http://localhost:{port}/3d.html to view your 3D model")
                print("Press Ctrl+C to stop the server")
                
                # Automatically open the browser (optional)
                try:
                    webbrowser.open(f'http://localhost:{port}/3d.html')
                except:
                    pass
                
                httpd.serve_forever()
        except OSError:
            continue
    
    print(f"❌ Could not start server on ports {PORT}-{PORT+9}")
    sys.exit(1)

if __name__ == "__main__":
    main()
