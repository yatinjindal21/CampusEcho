pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')  
        DOCKERHUB_REPO = 'your-dockerhub-username/thapar-news'
        DOCKERHUB_TAG = "latest"  // Or use "${BUILD_NUMBER}" for unique tag
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/thapar-news.git'
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t $DOCKERHUB_REPO:$DOCKERHUB_TAG ."
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push $DOCKERHUB_REPO:$DOCKERHUB_TAG"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker image pushed to Docker Hub: $DOCKERHUB_REPO:$DOCKERHUB_TAG"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
