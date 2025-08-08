#!/bin/bash

# Script to initialize all project tasks in the database
echo "🚀 Initializing DhanRaksha Project Tasks..."

# Make sure the backend is running
echo "📡 Calling reinitialize endpoint..."

# Call the reinitialize endpoint to populate all tasks
curl -X POST http://localhost:5000/tasks/reinitialize \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n"

echo "✅ Task initialization complete!"
echo "📊 Visit http://localhost:3000/tracking to view your project progress"