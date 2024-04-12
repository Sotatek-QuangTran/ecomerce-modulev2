pipeline{
    agent none
    stages{
        stage("deploy"){
            steps{
                sh docker-compose up -d
            }
        }
    }
}
