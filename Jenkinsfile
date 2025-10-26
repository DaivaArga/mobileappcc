pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'zakiwinanda'
        IMAGE_NAME = 'reactnativeapp'
        IMAGE_TAG = 'latest'
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
                    echo '🛠️  Build Docker image...'
                    sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    echo '🔐 Login ke DockerHub...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "echo \$PASSWORD | docker login -u \$USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo '📤 Push image ke DockerHub...'
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
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
                    docker run -d -p 8081:8081 --name rn_container ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
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
