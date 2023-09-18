node {
    def app

    stage('Clone repository') {
      checkout scm
    }

    stage('Install project') {
      sh 'npm install'
    }

    stage('Build image') {
      sh 'npm run build'
    }

    stage('Send data to the server') {

    }
}
