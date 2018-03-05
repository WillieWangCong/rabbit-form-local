export default function () {
  console.log('default')
}
export function a() {
  console.log('a')
}

var b = 'xxx';
export {
  b
}; // 这是ES6的写法，实际上就是{b:b}

export var c = 100;
