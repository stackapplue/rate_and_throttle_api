const axios = require("axios");
const logger = require("./logger");

const rates = [
  16,
  256,
  4096
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runMinute(totalCalls, minute) {

  console.log(`Starting minute ${minute}`);

  const requests = [];

  for (let i = 1; i <= totalCalls; i++) {

    const payload = {
      id: i,
      message: `${i}`
    };

    logger.info({
      message: "Sending Request",
      payload
    });

    const req = axios.post(
      "http://localhost:3002/throttle",
      payload
    )
    .then(response => {

      logger.info({
        message: "Received Response",
        data: response.data
      });

    })
    .catch(error => {

      logger.error({
        message: "Request Failed",
        error: error.message
      });
    });

    requests.push(req);
  }

  await Promise.all(requests);

  console.log(`Minute ${minute} completed`);
}

async function main() {

  for (let i = 0; i < rates.length; i++) {

    await runMinute(rates[i], i + 1);

    await sleep(60000);
  }

  console.log("All completed");
}

main();