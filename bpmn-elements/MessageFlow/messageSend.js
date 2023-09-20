import testHelpers from "../../helpers/testHelpers.js";
import factory from '../../helpers/factory.js';

async function run() {
  const context = await testHelpers.context(
    factory.resource("lanes.bpmn").toString()
  );
  const activity = context.getActivityById("task1");
  activity.once("activity.execution.completed", () => {
    activity.broker.publish("format", "run.end", {
      message: { id: "message_1" },
    });
  });

  const [flow] = context.getMessageFlows("mainProcess");

  flow.activate();

  const messages = [];
  flow.broker.subscribeTmp(
    "event",
    "message.outbound",
    (_, msg) => {
      messages.push(msg);
    },
    { noAck: true }
  );

  activity.run();

  console.log("messages", messages);
}

run();
