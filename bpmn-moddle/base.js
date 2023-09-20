const BpmnModdle = require("bpmn-moddle");

const moddle = new BpmnModdle();

const xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
  'id="empty-definitions" ' +
  'targetNamespace="http://bpmn.io/schema/bpmn">' +
  "</bpmn2:definitions>";

async function run() {
  const result = await moddle.fromXML(xmlStr);
  console.log("result", result);
  const { rootElement: definitions } = result;
  console.log("definitions.$type", definitions.$type);
  console.log("definitions", definitions);
  const { xml: xmlStrUpdated2 } = await moddle.toXML(definitions);
  console.log("xmlStrUpdated2", xmlStrUpdated2);

  // update id attribute
  definitions.set("id", "NEW ID");
  console.log("definitions after set id:", definitions);

  // add a root element
  const bpmnProcess = moddle.create("bpmn:Process", { id: "MyProcess_1" });
  console.log("bpmnProcess", bpmnProcess);

  definitions.get("rootElements").push(bpmnProcess);

  console.log("definitions after push bpmnProcess:", definitions);

  // xmlStrUpdated contains new id and the added process
  const { xml: xmlStrUpdated } = await moddle.toXML(definitions);
  console.log("xmlStrUpdated", xmlStrUpdated);
}

run();
