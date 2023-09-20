import { EventEmitter } from "events";

function MyEmitter() {
  // 构造函数逻辑
}

// 继承 EventEmitter
MyEmitter.prototype = Object.create(EventEmitter.prototype);

// 没有修复 constructor 属性
MyEmitter.prototype.constructor = MyEmitter;
var myEmitter = new MyEmitter();

console.log(myEmitter.constructor); // 输出 [Function: EventEmitter]
console.log(myEmitter instanceof MyEmitter); // 输出 false
