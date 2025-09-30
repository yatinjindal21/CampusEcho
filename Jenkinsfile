pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "yatinjindal21/campusecho_backend"
        FRONTEND_IMAGE = "yatinjindal21/campusecho_frontend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/yatinjindal21/CampusEcho.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:latest", "./server")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./client")
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
    }
}
