pipeline {
    agent any

    environment {
        // Ganti sesuai username dan nama image Docker Hub kamu
        DOCKER_HUB_USER = 'kylasalsa'
        IMAGE_NAME = 'reactnativeapp'
        IMAGE_TAG = 'latest'
        REGISTRY = 'https://index.docker.io/v1/'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Mengambil kode project...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🛠️  Build Docker image...'
                    sh 'docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    echo '🔐 Login ke DockerHub...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo '📤 Push image ke DockerHub...'
                    sh 'docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}'
                }
            }
        }

        stage('Deploy (optional)') {
            steps {
                script {
                    echo '🚀 Menjalankan container (opsional untuk test)...'
                    sh '''
                    docker stop reactnative_container || true
                    docker rm reactnative_container || true
                    docker run -d -p 8081:8081 --name reactnative_container ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline sukses dijalankan!'
        }
        failure {
            echo '❌ Pipeline gagal, periksa error log di Jenkins.'
        }
    }
}
