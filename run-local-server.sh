#!/bin/bash
echo "Starting local web server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""
echo "Open in browser: http://localhost:8000/central.html"
echo ""
python3 -m http.server 8000
