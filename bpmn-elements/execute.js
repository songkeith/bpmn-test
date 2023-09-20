// const elements = require("bpmn-elements");
// const BpmnModdle = require("bpmn-moddle");
// const {
//   default: serialize,
//   TypeResolver,
// } = require("moddle-context-serializer");

import * as elements from "bpmn-elements";

import BpmnModdle from "bpmn-moddle";

import { Serializer, TypeResolver } from "moddle-context-serializer";

const { Context, Definition } = elements;

const typeResolver = TypeResolver(elements);

const id = Math.floor(Math.random() * 10000);

const source = `
<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <process id="theProcess2" isExecutable="true">
    <startEvent id="theStart" />
    <exclusiveGateway id="decision" default="flow2" />
    <endEvent id="end1" />
    <endEvent id="end2" />
    <sequenceFlow id="flow1" sourceRef="theStart" targetRef="decision" />
    <sequenceFlow id="flow2" sourceRef="decision" targetRef="end1" />
    <sequenceFlow id="flow3" sourceRef="decision" targetRef="task">
      <conditionExpression>true</conditionExpression>
    </sequenceFlow>
    <serviceTask id="task" implementation="\${environment.services.myService}" />
    <sequenceFlow id="flowend" sourceRef="task" targetRef="end2" />
  </process>
</definitions>`;

function getModdleContext(sourceXml) {
  const bpmnModdle = new BpmnModdle();
  return bpmnModdle.fromXML(sourceXml.trim());
}

function Logger(scope) {
  return {
    debug: console.debug.bind(console, "bpmn-elements:" + scope),
    error: console.error.bind(console, "bpmn-elements:" + scope),
    warn: console.warn.bind(console, "bpmn-elements:" + scope),
  };
}

async function run() {
  const moddleContext = await getModdleContext(source);
  const options = {
    Logger,
    services: {
      myService(arg, next) {
        console.log("myService called with", arg);
        next();
      },
      variables: {
        id,
      },
    },
  };
  const context = new Context(Serializer(moddleContext, typeResolver));

  const definition = new Definition(context, options);
//   console.log("definition", definition);
    definition.run();
}

run();
