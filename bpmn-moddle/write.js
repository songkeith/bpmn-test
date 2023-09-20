const BpmnModdle = require("bpmn-moddle");

const { assign } = require("min-dash");

function write(element, options) {
  // skip preamble for tests
  options = assign({ preamble: false }, options);

  return moddle.toXML(element, options);
}

async function run() {
  var definitions = moddle.create("bpmn:Definitions");
  var { xml } = await write(definitions);
  // xml contains the xml string
  console.log("xml", xml);

  // given
  var interfaceElement = moddle.create("bpmn:Interface", {
    id: "Interface_1",
  });

  var participantElement = moddle.create("bpmn:Participant", {
    id: "Process_1",
    interfaceRef: [interfaceElement],
  });

  var collaborationElement = moddle.create("bpmn:Collaboration", {
    participants: [participantElement],
  });

  var definitions = moddle.create("bpmn:Definitions", {
    targetNamespace: "http://bpmn.io/bpmn",
    rootElements: [interfaceElement, collaborationElement],
  });

  var { xml } = await write(definitions);

  console.log("xml", xml);
}
