node {
    def app

    stage('Clone repository') {
      checkout scm
    }

    stage('Install project') {
      sh 'yarn'
    }

    stage('Build image') {
      sh 'yarn build'
    }

    stage('Send data to the server') {

    }
}
