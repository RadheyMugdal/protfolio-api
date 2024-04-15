Node.js Backend Project
Welcome to the Node.js backend project! This project provides functionality for processing CSV data via HTTP POST requests.

Getting Started
To get started with this project, follow these steps:

Prerequisites
Node.js installed on your machine
Installation
Clone the repository to your local machine:

bash
Copy code
git clone <repository_url>
Navigate to the project directory:

bash
Copy code
cd nodejs-backend-project
Install dependencies:

Copy code
npm install
Usage
Starting the Application
To start the application, run:

arduino
Copy code
npm run start
The server will start running at http://localhost:3000.

Processing CSV Data
The main route for processing CSV data is:

bash
Copy code
POST http://localhost:3000/process_csv
Request
Make a POST request to the above route with CSV data in the body as form data.

Example using cURL:
bash
Copy code
curl -X POST \
  http://localhost:3000/process_csv \
  -H 'Content-Type: multipart/form-data' \
  -F 'data=@/path/to/your/csv/file.csv'
Replace /path/to/your/csv/file.csv with the path to your CSV file.

Response
Upon successful processing, the server will respond with a success message and any processed data. In case of errors, appropriate error messages will be returned.

Testing
You can test the API endpoints using Postman or any other HTTP client.
