pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = "zakiwinanda/myapp-reactnativeapp"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Mengambil source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🛠️ Build Docker image...'
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo '📤 Push image ke DockerHub...'
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy (optional)') {
            steps {
                script {
                    echo '🚀 Menjalankan container test...'
                    sh '''
                    docker stop rn_container || true
                    docker rm rn_container || true
                    docker run -d -p 8081:8081 --name rn_container ${IMAGE_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Push berhasil ke Docker Hub!'
        }
        failure {
            echo '❌ Build gagal, periksa log di Jenkins console.'
        }
    }
}
