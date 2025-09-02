#!/bin/bash

# Danone Scout - Deployment Script
echo "🚀 Danone Scout Deployment Script"
echo "========================================="

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to build and deploy
deploy() {
    echo "📦 Building and deploying the application..."
    docker-compose up --build -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Application deployed successfully!"
        echo "🌐 Access the app at: http://localhost:3000"
        echo "📊 View container status: docker ps"
        echo "📝 View logs: docker logs danone-menu-tracker"
    else
        echo "❌ Deployment failed. Check the logs for more information."
        exit 1
    fi
}

# Function to stop the application
stop() {
    echo "🛑 Stopping the application..."
    docker-compose down
    echo "✅ Application stopped"
}

# Function to view logs
logs() {
    echo "📝 Viewing application logs..."
    docker logs danone-scout -f
}

# Function to check status
status() {
    echo "📊 Application Status:"
    echo "====================="
    docker ps --filter "name=danone-scout" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo ""
    echo "🔗 Testing connectivity..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
        echo "✅ Application is accessible at http://localhost:3000"
    else
        echo "❌ Application is not responding"
    fi
}

# Main script logic
case "$1" in
    "deploy"|"start"|"up")
        check_docker
        deploy
        ;;
    "stop"|"down")
        stop
        ;;
    "logs")
        logs
        ;;
    "status")
        status
        ;;
    "restart")
        check_docker
        stop
        sleep 2
        deploy
        ;;
    *)
        echo "Usage: $0 {deploy|start|stop|restart|logs|status}"
        echo ""
        echo "Commands:"
        echo "  deploy/start/up  - Build and deploy the application"
        echo "  stop/down        - Stop the application"
        echo "  restart          - Restart the application"
        echo "  logs             - View application logs"
        echo "  status           - Check application status"
        echo ""
        echo "Examples:"
        echo "  $0 deploy        # Deploy the app"
        echo "  $0 status        # Check if app is running"
        echo "  $0 logs          # View live logs"
        echo "  $0 stop          # Stop the app"
        exit 1
        ;;
esac
