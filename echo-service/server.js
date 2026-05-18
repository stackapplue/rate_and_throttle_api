const express = require("express");
const logger = require("./logger");
const RateLimiter = require("./rateLimiter");

const app = express();
const PORT = process.env.PORT || 3003; // ยืดหยุ่นเผื่อเปลี่ยนพอร์ตผ่าน ENV

app.use(express.json());

// ตั้งค่า Limit ไว้ที่ 512 requests ต่อนาทีตามที่คุณออกแบบ
const limiter = new RateLimiter(512);

app.post("/echo", (req, res) => {
  const allowed = limiter.isAllowed();

  if (!allowed) {
    logger.warn({
      message: "Exceeding Limit",
      currentUsage: limiter.currentUsage(),
      body: req.body
    });

    return res.status(429).json({
      success: false,
      message: "Exceeding Limit"
    });
  }

  logger.info({
    message: "Echo Success",
    body: req.body,
    currentUsage: limiter.currentUsage()
  });

  return res.json({
    success: true,
    data: req.body
  });
});

app.listen(PORT, () => {
  logger.info(`Echo Service running on port ${PORT}`);
});