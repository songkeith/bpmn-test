const {Engine} = require('bpmn-engine');
const {EventEmitter} = require('events');
const {promises: fs} = require('fs');

const processXml = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <process id="theProcess" isExecutable="true">
    <startEvent id="theStart" />
    <sequenceFlow id="flow1" sourceRef="theStart" targetRef="userTask" />
    <userTask id="userTask" />
    <sequenceFlow id="flow2" sourceRef="userTask" targetRef="theEnd" />
    <endEvent id="theEnd" />
  </process>
</definitions>`;

const engine = new Engine({
  source: processXml
});

const listener = new EventEmitter();

let state;
listener.once('activity.wait', async () => {
  state = await engine.getState();
  await fs.writeFile('./tmp/getstate/wait.json', JSON.stringify(state, null, 2));
});

listener.once('activity.start', async () => {
  state = await engine.getState();
  await fs.writeFile('./tmp/getstate/start.json', JSON.stringify(state, null, 2));
});

engine.execute({
  listener
});