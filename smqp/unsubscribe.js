import { Broker } from "smqp";

const broker = Broker();

const queue = broker.assertQueue("testq");
broker.subscribe("test", "test.*", "testq", onMessage1);
broker.subscribe("test", "test.#", "testq", onMessage2);

// expect(queue.consumerCount).to.equal(2);
console.log(`queue.consumerCount ${queue.consumerCount}`);

broker.publish("test", "test.1");
broker.publish("test", "test.2");
broker.publish("test", "test.3");

// expect(queue.consumerCount).to.equal(1);
console.log('queue.consumerCount',queue.consumerCount);

function onMessage1(routingKey, message, owner) {
  console.log(`"onMessage1" routingKey: ${routingKey} message: ${JSON.stringify(message)} owner: ${owner}`);
//   broker.unsubscribe("testq", onMessage2);
}

function onMessage2(routingKey, message, owner) {
  console.log(`onMessage2: routingKey: ${routingKey} message: ${JSON.stringify(message)} owner: ${owner}`);
  console.log("onMessage2");
}

// type onMessage = (
//     routingKey: string,
//     message: Message,
//     owner: any
//   ) => void
