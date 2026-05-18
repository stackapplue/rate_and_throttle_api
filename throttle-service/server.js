const express = require("express");
const axios = require("axios");

const logger = require("./logger");
const ThrottleQueue = require("./throttleQueue");

const app = express();

app.use(express.json());

// แก้จาก 4096 เป็น 500 เพื่อไม่ให้เกิน Limit ของ Echo Service (512/min)
const queue = new ThrottleQueue(500); 

app.post("/throttle", async (req, res) => {
  const payload = req.body;

  logger.info({
    message: "Incoming Request",
    payload
  });

  queue.add(async () => {
    try {
      logger.info({ message: "Forwarding to Echo", payload });

      const response = await axios.post(
        "http://localhost:3003/echo",
        payload
      );

      logger.info({ message: "Echo Response", data: response.data });
    } catch (error) {
      // ดักจับ Error ที่เป็น Response จาก Axios ให้แสดงผลชัดเจนขึ้น
      const errorMessage = error.response ? error.response.data : error.message;
      logger.error({
        message: "Echo Error",
        error: errorMessage
      });
    }
  });

  res.json({
    success: true,
    message: "Queued"
  });
});

app.listen(3002, () => {
  console.log("Throttle Service running on port 3002");
});