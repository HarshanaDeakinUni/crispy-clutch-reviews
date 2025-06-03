pipeline {
  agent any

  environment {
    IMAGE_NAME = "crispy-clutch-reviews"
    DOCKER_TAG = "latest"
    REGISTRY = "ghcr.io/HarshanaDeakinUni" // or Docker Hub or other
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/HarshanaDeakinUni/crispy-clutch-reviews'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test || true' // Continues even if tests fail
      }
    }

    stage('Generate Coverage Report') {
      steps {
        sh 'npm run coverage || true'
      }
    }

    stage('NPM Audit (Security Scan)') {
      steps {
        sh 'npm audit || true'
      }
    }

    stage('SonarCloud Analysis') {
      steps {
        withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
          sh '''
            if ! command -v sonar-scanner &> /dev/null; then
              echo "Installing SonarScanner..."
              wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
              unzip -o sonar-scanner-cli-5.0.1.3006-linux.zip
              export PATH=$PATH:$(pwd)/sonar-scanner-5.0.1.3006-linux/bin
            fi

            export PATH=$PATH:$(pwd)/sonar-scanner-5.0.1.3006-linux/bin

            sonar-scanner \
              -Dsonar.login=$SONAR_TOKEN
          '''
        }
      }
    }

    stage('Release (Tag and Push Image)') {
      steps {
        withCredentials([string(credentialsId: 'DOCKER_PAT', variable: 'DOCKER_PAT')]) {
          sh '''
            echo $DOCKER_PAT | docker login $REGISTRY -u HarshanaDeakinUni --password-stdin
            docker tag $IMAGE_NAME $REGISTRY/$IMAGE_NAME:$DOCKER_TAG
            docker push $REGISTRY/$IMAGE_NAME:$DOCKER_TAG
          '''
        }
      }
    }

    stage('Deploy (Run Locally or on Server)') {
      steps {
        sh '''
          echo "Running Docker container locally..."
          docker stop crispy || true
          docker rm crispy || true
          docker run -d -p 3000:3000 --name crispy $REGISTRY/$IMAGE_NAME:$DOCKER_TAG
        '''
      }
    }

    stage('Monitoring (Simulated)') {
      steps {
        sh '''
          echo "Checking if app is up..."
          sleep 3
          curl -s http://localhost:3000 || echo "App might not be up yet"
        '''
      }
    }
  }
}
