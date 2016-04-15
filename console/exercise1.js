let arrayLike = new Set([2, 7]);

// ES5的写法
//var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike, x => x * x ); // ['a', 'b', 'c']

console.log(arr2);
