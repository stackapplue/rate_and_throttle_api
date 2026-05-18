Services Overview
1. Caller Service

The Caller Service generates large volumes of API requests and sends them to the Throttle Service.

Responsibilities:

Generate requests at exponential rates (16^n)
Assign incremental IDs for every request
Wait until all requests are completed
Log request and response timestamps

Example:

First minute → 16 calls
Second minute → 256 calls
Third minute → 4,096 calls
2. Throttle Service

The Throttle Service controls the request rate before forwarding requests to the Echo Service.

Responsibilities:

Queue incoming requests
Throttle requests to maximum 4,096 requests/minute
Forward requests to Echo Service
Log throttle events and request status

This service prevents downstream overload and simulates real-world API gateway behavior.

3. Echo Service

The Echo Service receives requests and responds with the same payload.

Responsibilities:

Echo back request data
Apply rate limiting
Reject requests exceeding 512 requests/minute
Log current rate usage and request status

If the limit is exceeded:

{
  "success": false,
  "message": "Exceeding Limit"
}
Technologies Used
Technology	Purpose
Node.js	Backend runtime
Express.js	REST API framework
Axios	HTTP client
Winston	Logging system
PM2	Process manager and clustering
Project Structure
rate-throttle-system/
│
├── caller-service/
│
├── throttle-service/
│
├── echo-service/
│
└── README.md
Features
Standalone microservice architecture
REST API communication
Request queue processing
Rate limiting
Throttling
Centralized logging
PM2 clustering support
Async processing
Error handling
Production-ready structure
How To Run
1. Install Dependencies

Install packages for all services.

Example:

cd echo-service
npm install

cd ../throttle-service
npm install

cd ../caller-service
npm install
2. Start Echo Service
cd echo-service
node server.js

Runs on:

http://localhost:3003
3. Start Throttle Service
cd throttle-service
node server.js

Runs on:

http://localhost:3002
4. Start Caller Service
cd caller-service
node server.js