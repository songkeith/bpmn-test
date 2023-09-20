//读取bpmn 的xml
import BpmnModdle from 'bpmn-moddle';

const source = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <process id="theProcess" isExecutable="true">
    <serviceTask id="task" implementation="\${environment.services.myService}" />
  </process>
</definitions>`;

async function run() {
    const bpmnModdle = new BpmnModdle();
    const context = await  bpmnModdle.fromXML(source.trim());
    console.log('context', context);
    const {
        rootElement: definitions
      } = context

    console.log('definitions', definitions);
    console.log('definitions.$type', definitions.$type);
    console.log('definitions.rootElements', definitions.rootElements[0].$type);
    // const rootElements =  definitions.get('process')
    // console.log('rootElements', rootElements);
}

run();

