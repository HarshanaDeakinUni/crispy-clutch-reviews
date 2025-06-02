pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t hotbag-app .'
      }
    }

    stage('Test') {
      steps {
        dir('backend') {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }

    stage('Code Quality') {
      steps {
        sh 'sonar-scanner -Dsonar.login=$SONAR_TOKEN'
      }
    }

    stage('Security') {
      steps {
        dir('backend') {
          sh 'npm audit || true'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose up -d'
      }
    }

    stage('Release') {
      steps {
        script {
          def tag = "v1.${env.BUILD_NUMBER}"
          sh "git tag ${tag}"
          sh "git push origin ${tag}"
        }
      }
    }

    stage('Monitoring') {
      steps {
        sh 'curl --fail http://localhost:3000/health || exit 1'
      }
    }
  }
}