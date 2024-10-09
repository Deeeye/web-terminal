# Web Terminal Application

## Overview

This project is a web-based terminal application with complete SSH and password capabilities. The web terminal interface provides a desktop-like adjustment system, allowing users to move, resize, close, and maximize the terminal windows. Users can open one or more terminal instances inside the web interface and move them freely. The project is containerized using Docker and integrated with Jenkins, SonarQube, and Trivy for continuous integration, code quality analysis, and vulnerability scanning.

## Project Structure

```plaintext
web-terminal
├── backend
│   ├── server.js              # Backend server code handling SSH connections
│   ├── package.json           # Backend dependencies
│   └── config
│       └── config.js          # Configuration settings like port and SSH key management
├── frontend
│   ├── public
│   │   └── index.html         # Frontend entry HTML file
│   ├── src
│   │   ├── components         # React components
│   │   │   ├── Terminal.js    # Terminal window component
│   │   │   ├── TerminalManager.js  # Manages all terminal windows
│   │   ├── context
│   │   │   └── TerminalContext.js  # State and context management for the application
│   │   ├── App.js             # Main React application file
│   │   ├── index.js           # Entry point for React application
│   │   └── styles
│   │       └── App.css        # CSS styles for the application
│   ├── package.json           # Frontend dependencies
│   └── .env                   # Environment variables (e.g., WebSocket URL)
├── Dockerfile                 # Dockerfile for multi-stage build and deployment
├── Jenkinsfile                # Jenkins pipeline script for CI/CD
├── sonar-project.properties   # SonarQube configuration for code quality analysis
└── README.md                  # Project documentation
```

## Features

- Full SSH and password capabilities for remote terminal connections.
- Drag, resize, close, and maximize terminal windows within a desktop-like interface.
- Multiple terminal sessions with independent SSH connections.
- Docker containerization for the entire application.
- CI/CD pipeline with Jenkins.
- Code quality analysis using SonarQube.
- Vulnerability scanning with Trivy.

## Prerequisites

1. Docker and Docker Compose installed on your machine.
2. Node.js and npm installed for frontend and backend development.
3. Jenkins installed and configured.
4. SonarQube installed and configured.
5. Trivy installed for vulnerability scanning.

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/web-terminal.git
cd web-terminal
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory and add your environment variables:

    ```plaintext
    PORT=3001
    SSH_HOST=localhost
    SSH_PORT=22
    SSH_USERNAME=user
    SSH_PASSWORD=pass
    ```

4. Start the backend server:

    ```bash
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the frontend directory and add your environment variables:

    ```plaintext
    REACT_APP_WS_URL=ws://localhost:3001
    ```

4. Start the frontend server:

    ```bash
    npm start
    ```

### Docker Setup

1. Build and run the Docker container:

    ```bash
    docker build -t web-terminal .
    docker run -d -p 80:80 --name web-terminal-container web-terminal
    ```

2. Access the application in your browser at `http://localhost`.

### Jenkins Setup

1. Configure Jenkins with the required plugins:
   - Docker Plugin
   - SonarQube Scanner Plugin
   - Trivy Plugin (or use shell commands to run Trivy)

2. Create a new Jenkins pipeline and use the `Jenkinsfile` from this repository.

3. Set up the necessary environment variables and credentials in Jenkins for Docker and SonarQube.

### SonarQube Setup

1. Install SonarQube on a local server or use a cloud instance.
2. Create a new project in SonarQube and generate a project token.
3. Configure the `sonar-project.properties` file with the project key, name, and server details.

### Trivy Setup

1. Download Trivy or run it as a Docker container:

    ```bash
    docker pull aquasec/trivy
    ```

2. Use the following command to scan the Docker image:

    ```bash
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL web-terminal:latest
    ```

## Usage

- Open the web application in your browser.
- Click on "Add Terminal" to create a new terminal window.
- Enter your SSH credentials to connect to a remote server.
- Manage terminal windows by dragging, resizing, closing, or maximizing them.
- Open multiple terminal windows to handle multiple SSH sessions.

## CI/CD Pipeline

The Jenkins pipeline defined in the `Jenkinsfile` performs the following stages:

1. **Checkout**: Checks out the repository from GitHub.
2. **Build Docker Image**: Builds a Docker image for the application.
3. **Static Code Analysis with SonarQube**: Runs static code analysis using SonarQube.
4. **Security Scan with Trivy**: Scans the Docker image for vulnerabilities using Trivy.
5. **Push Docker Image**: Pushes the Docker image to a specified Docker registry.
6. **Deploy**: Deploys the Docker image to the target environment.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Make sure to follow the guidelines and maintain code quality.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
