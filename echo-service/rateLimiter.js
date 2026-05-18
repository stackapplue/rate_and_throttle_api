class RateLimiter {
  constructor(limitPerMinute) {
    this.limitPerMinute = limitPerMinute;
    this.requests = [];

    // เพิ่ม Interval เพื่อเคลียร์ข้อมูลเก่าที่ค้างใน Memory ทุกๆ 1 นาที 
    // ป้องกันกรณีไม่มี Request ใหม่เข้ามาแล้ว Memory บวม (Memory Leak)
    setInterval(() => {
      const now = Date.now();
      this.requests = this.requests.filter(time => now - time < 60000);
    }, 60000);
  }

  isAllowed() {
    const now = Date.now();

    // ล้างข้อมูลที่เก่ากว่า 1 นาทีออกก่อนเช็คสิทธิ์
    this.requests = this.requests.filter(time => now - time < 60000);

    if (this.requests.length >= this.limitPerMinute) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  currentUsage() {
    return this.requests.length;
  }
}

module.exports = RateLimiter;