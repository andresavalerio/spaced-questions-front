node {
    def app

    stage('Clone repository') {
      checkout scm
    }

    stage('Install project') {
      sh 'pnpm install'
    }

    stage('Build image') {
      sh 'pnpm build'
    }

    stage('Send data to the server') {

    }
}
