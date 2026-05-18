# Rate and Throttle API System

> Programming and Algorithm Test — Question #3  
> Node.js Distributed API Throttling and Rate Limiting System

---

# System Architecture

```text
+------------------+
|  Caller Service  |
+------------------+
          |
          v
+--------------------+
|  Throttle Service  |
+--------------------+
          |
          v
+----------------+
|  Echo Service  |
+----------------+
```

---

# Table of Contents

1. Project Introduction
2. Objectives
3. System Architecture
4. Services Overview
5. Technologies Used
6. Project Structure
7. Features
8. Installation
9. How To Run
10. System Design Concepts
11. Future Improvements
12. Notes
13. Author

---

# 1. Project Introduction

This project is developed for the Programming and Algorithm Test - Question #3: Rate and Throttle API.

The system demonstrates a distributed microservice-style architecture using Node.js and REST APIs. It consists of three standalone services communicating with each other to simulate high-volume API traffic, request throttling, and rate limiting.

The main objective of this project is to demonstrate:
- API rate control
- Request throttling
- Queue processing
- Distributed service communication
- Logging and monitoring
- Asynchronous request handling
- Backend system architecture concepts

---

# 2. Objectives

- Build 3 standalone services
- Simulate exponential API traffic
- Implement request throttling
- Implement rate limiting
- Handle async processing
- Demonstrate scalable backend architecture
- Create detailed logging system

---

# 3. System Architecture

```text
Caller Service
      |
      v
Throttle Service
      |
      v
Echo Service
```

Request Flow:

```text
Caller -> Throttle Queue -> Echo -> Response
```

---

# 4. Services Overview

## 4.1 Caller Service

The Caller Service generates API traffic and sends requests to the Throttle Service.

Responsibilities:
- Generate exponential request volume
- Create incremental request IDs
- Send requests asynchronously
- Wait until all requests finish
- Log request and response timestamps

Request Rate:
- First minute → 16 requests
- Second minute → 256 requests
- Third minute → 4,096 requests

---

## 4.2 Throttle Service

The Throttle Service acts as a middleware gateway between Caller and Echo services.

Responsibilities:
- Receive requests
- Queue incoming traffic
- Throttle requests to maximum 4,096 requests/minute
- Forward requests safely
- Log throttle events

This layer prevents downstream overload.

---

## 4.3 Echo Service

The Echo Service processes requests and returns responses.

Responsibilities:
- Echo request payload
- Apply rate limiting
- Reject overload requests
- Log rate limit usage

If requests exceed 512 requests/minute:

```json
{
  "success": false,
  "message": "Exceeding Limit"
}
```

---

# 5. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| Axios | HTTP client |
| Winston | Logging system |
| PM2 | Process manager |
| JavaScript | Core programming language |

---

# 6. Project Structure

```text
rate-throttle-system/
│
├── caller-service/
│   ├── logs/
│   ├── logger.js
│   ├── package.json
│   └── server.js
│
├── throttle-service/
│   ├── logs/
│   ├── logger.js
│   ├── throttleQueue.js
│   ├── package.json
│   └── server.js
│
├── echo-service/
│   ├── logs/
│   ├── logger.js
│   ├── rateLimiter.js
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# 7. Features

- Distributed service architecture
- REST API communication
- Queue-based request processing
- Request throttling
- API rate limiting
- Detailed logging system
- PM2 cluster support
- Async processing
- Error handling
- Production-style architecture

---

# 8. Installation

## Clone Project

```bash
git clone <repository-url>
cd rate-throttle-system
```

---

## Install Dependencies

### Echo Service

```bash
cd echo-service
npm install
```

### Throttle Service

```bash
cd ../throttle-service
npm install
```

### Caller Service

```bash
cd ../caller-service
npm install
```

---

# 9. How To Run

Open 3 terminals.

---

## Terminal 1 — Echo Service

```bash
cd echo-service
node server.js
```

Runs on:

```text
http://localhost:3003
```

---

## Terminal 2 — Throttle Service

```bash
cd throttle-service
node server.js
```

Runs on:

```text
http://localhost:3002
```

---

## Terminal 3 — Caller Service

```bash
cd caller-service
node server.js
```

---

# 10. PM2 Clustering

Install PM2:

```bash
npm install -g pm2
```

Run cluster mode:

```bash
pm2 start server.js --name echo-service -i max
```

Cluster Benefits:
- Multi-core CPU usage
- Better performance
- Auto restart
- Process monitoring
- Production deployment support

Useful Commands:

```bash
pm2 list
pm2 logs
pm2 restart all
pm2 stop all
```

---

# 11. Logging System

Each service creates logs with timestamps.

Example:

```text
logs/caller.log
logs/throttle.log
logs/echo.log
```

Logged Information:
- Request ID
- Payload
- Timestamp
- Response status
- Throttle events
- Rate limit usage
- Error messages

---

# 12. API Flow

Example request flow:

```text
Caller Service
    |
    | POST /throttle
    v
Throttle Service
    |
    | Queue + Throttle
    v
Echo Service
    |
    | Response
    v
Throttle Service
    |
    v
Caller Service
```

---

# 13. System Design Concepts

This project demonstrates:

- Microservice Architecture
- API Gateway Pattern
- Request Queue
- Throttling
- Rate Limiting
- Async Processing
- Logging and Monitoring
- Service Isolation
- Scalability Concepts
- Production Backend Design

---

# 14. Future Improvements

Possible production improvements:

- Redis distributed cache
- Redis-based rate limiting
- BullMQ / RabbitMQ queue
- Docker Compose
- Kubernetes deployment
- JWT authentication
- Monitoring dashboard
- Grafana integration
- Health check endpoint
- Retry mechanism
- Circuit breaker pattern

---

# 15. Notes

- Current rate limiter uses in-memory storage.
- PM2 cluster mode creates isolated memory per process.
- Production systems should use Redis for centralized rate limiting.

---

# 16. Author

Programming and Algorithm Test Submission  
Node.js Backend Distributed System Project