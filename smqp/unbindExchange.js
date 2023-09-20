import {Broker} from 'smqp';

const broker = Broker();
broker.assertExchange('source-events');
broker.assertExchange('dest-events');

broker.bindExchange('source-events', 'dest-events');

const messages = [];
broker.subscribeTmp('dest-events', '#', (routingKey) => {
  messages.push(routingKey);
}, { noAck: true });

broker.publish('source-events', 'test.1');
broker.publish('source-events', 'test.2');

broker.unbindExchange('source-events', 'dest-events');

broker.publish('source-events', 'test.3');
broker.publish('source-events', 'test.4');

console.log(messages);