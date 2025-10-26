pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/zakiwinanda/myApp.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint || true'
      }
    }

    stage('Build') {
      steps {
        sh 'npx expo export --platform android'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t zakiwinanda/myapp .'
      }
    }

    stage('Run with Docker Compose') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }

  post {
    success {
      echo '✅ Build and deploy successful!'
    }
    failure {
      echo '❌ Build failed. Please check logs.'
    }
  }
}
