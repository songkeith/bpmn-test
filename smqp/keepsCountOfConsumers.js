import Broker from "smqp";
const broker = Broker();

broker.assertQueue("test-q", { durable: true, autoDelete: false });

const consumer1Name = "consumer1";

const consumer1 = broker.consume(
  "test-q",
  (routingKey, message, owner) => {
    console.log(
      `"onMessage1" routingKey: ${routingKey} message: ${JSON.stringify(
        message
      )} owner: ${owner}`
    );
  },
  { consumerTag: consumer1Name }
);
const consumer2 = broker.consume("test-q", (routingKey, message, owner) => {
  console.log(
    `"onMessage2" routingKey: ${routingKey} message: ${JSON.stringify(
      message
    )} owner: ${owner}`
  );
});

broker.sendToQueue("test-q", "test.1");
broker.sendToQueue("test-q", "test.2");
// 以下消息由于没有消费者，会被丢弃
broker.sendToQueue("test-q", "test.3");

//   expect(broker).to.have.property('consumerCount', 2);
console.log("broker.consumerCount", broker.consumerCount);

broker.cancel(consumer2.consumerTag);
broker.sendToQueue("test-q", "test.5");
broker.sendToQueue("test-q", "test.6");
broker.sendToQueue("test-q", "test.7");

broker.consume("test-q", (routingKey, message, owner) => {
    console.log(
      `"onMessage3" routingKey: ${routingKey} message: ${JSON.stringify(
        message
      )} owner: ${owner}`
    );
  });

//   expect(broker).to.have.property('consumerCount', 1);
console.log("broker.consumerCount", broker.consumerCount);
