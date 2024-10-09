pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "web-terminal"
        DOCKER_REGISTRY = "<your-docker-registry>"
        DOCKER_CREDENTIALS_ID = "<your-docker-credentials-id>"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository containing the Dockerfile
                git 'https://github.com/your-repo/web-terminal.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Static Code Analysis with SonarQube') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Security Scan with Trivy') {
            steps {
                script {
                    sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Commands for deployment (e.g., deploying to Kubernetes or a cloud provider)
                echo "Deploying Docker image to target environment..."
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
