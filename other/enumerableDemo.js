const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'John',
  enumerable: true // 将属性设置为可枚举
});

Object.defineProperty(obj, 'age', {
  value: 25,
  enumerable: false // 将属性设置为不可枚举
});

for (let key in obj) {
  console.log(key); // 输出 'name'，但不输出 'age'
}