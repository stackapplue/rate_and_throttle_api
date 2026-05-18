class ThrottleQueue {

  constructor(limitPerMinute) {
    this.limitPerMinute = limitPerMinute;
    this.queue = [];
    this.processing = false;
    this.currentMinuteCount = 0;

    setInterval(() => {
      this.currentMinuteCount = 0;
    }, 60000);
  }

  add(task) {
    this.queue.push(task);
    this.process();
  }

  async process() {

    if (this.processing) return;

    this.processing = true;

    while (this.queue.length > 0) {

      if (this.currentMinuteCount >= this.limitPerMinute) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      const task = this.queue.shift();

      this.currentMinuteCount++;

      await task();
    }

    this.processing = false;
  }
}

module.exports = ThrottleQueue;