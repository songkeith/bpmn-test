import testHelpers from "../../helpers/testHelpers.js";

const source = `
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_155ehxd" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process" isExecutable="true">
    <startEvent id="start" />
    <sequenceFlow id="to-decision" sourceRef="start" targetRef="decision" />
    <eventBasedGateway id="decision" />
  </process>
</definitions>`;

const context = await testHelpers.context(source);
const processes = context.getProcesses();
// console.log("processes", processes);
const bp = processes[0];

bp.run();
//completed: 1
console.log('bp',bp.counters)
