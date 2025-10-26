pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = "zakiwinanda/mobileappcc"
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
                    bat "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo '📤 Push image ke DockerHub...'
                    bat "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy (optional)') {
            steps {
                script {
                    echo '🚀 Menjalankan container test...'
                    bat '''
                    docker stop rn_container || exit 0
                    docker rm rn_container || exit 0
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
            echo '❌ Gagal, cek log error di Jenkins console output.'
        }
    }
}
