pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token') // set this in Jenkins secrets
  }

  stages {
    stage('Build') {
      steps {
        echo '🧱 Building Docker image...'
        sh 'docker build -t hotbag-app .'
      }
    }

    stage('Test') {
      steps {
        echo '🧪 Running backend tests...'
        dir('backend') {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }

    stage('Code Quality') {
      steps {
        echo '🔍 Running SonarQube analysis...'
        sh 'sonar-scanner -Dsonar.login=$SONAR_TOKEN'
      }
    }

    stage('Security') {
      steps {
        echo '🛡 Running npm audit...'
        dir('backend') {
          sh 'npm audit --audit-level=moderate || true'
        }
      }
    }

    stage('Deploy') {
      steps {
        echo '🚀 Deploying with Docker Compose...'
        sh 'docker-compose up -d --build'
      }
    }

    stage('Release') {
      steps {
        echo '🏷 Tagging release...'
        script {
          def tag = "v1.${env.BUILD_NUMBER}"
          sh "git tag ${tag}"
          sh "git push origin ${tag}"
        }
      }
    }

    stage('Monitoring') {
      steps {
        echo '📈 Checking backend health...'
        sh 'curl --fail http://localhost:3000/health || exit 1'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline finished!'
    }
  }
}
