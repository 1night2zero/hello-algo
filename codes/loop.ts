/* for 循环 */
const forLoop = (n: number): number => {
  let res = 0;
  // 循环求和 1, 2, ..., n-1, n
  for (let i = 1; i <= n; i++) {
    res += i;
  }
  return res;
};

/* while 循环 */
const whileLoop = (n: number): number => {
  let res = 0;
  let i = 1; // 初始化条件变量
  // 循环求和 1, 2, ..., n-1, n
  while (i <= n) {
    res += i;
    i++; // 更新条件变量
  }
  return res;
};

/* while 循环（两次更新） */
const whileLoopII = (n: number): number => {
  let res = 0;
  let i = 1; // 初始化条件变量
  // 循环求和 1, 4, 10, ...
  while (i <= n) {
    res += i;
    // 更新条件变量
    i++;
    i *= 2;
  }
  return res;
};

/* 双层 for 循环 */
const nestedForLoop = (n: number): string => {
  let res = "";
  // 循环 i = 1, 2, ..., n-1, n
  for (let i = 1; i <= n; i++) {
    // 循环 j = 1, 2, ..., n-1, n
    for (let j = 1; j <= n; j++) {
      res += `(${i}, ${j}), `;
    }
  }
  return res;
};

/* 递归 */
const recur = (n: number): number => {
  // 终止条件
  if (n === 1) return 1;
  // 递：递归调用
  const res = recur(n - 1);
  // 归：返回结果
  return n + res;
};

/* 尾递归 */
const tailRecur = (n: number, res: number = 0): number => {
  // 终止条件
  if (n === 0) return res;
  // 尾递归调用
  return tailRecur(n - 1, res + n);
};

/* 斐波那契数列：递归 */
const fib = (n: number): number => {
  // 终止条件 f(1) = 0, f(2) = 1
  if (n === 1 || n === 2) return n - 1;
  // 递归调用 f(n) = f(n-1) + f(n-2)
  // 返回结果 f(n)
  return fib(n - 1) + fib(n - 2);
};

/* 使用迭代模拟递归 */
const forLoopRecur = (n: number): number => {
  // 使用一个显式的栈来模拟系统调用栈
  const stack: number[] = [];
  let res: number = 0;
  // 递：递归调用
  for (let i = n; i > 0; i--) {
    // 通过“入栈操作”模拟“递”
    stack.push(i);
  }

  // 归：返回结果
  while (stack.length) {
    // 通过“出栈操作”模拟“归”
    res += stack.pop() as number;
  }
  // res = 1+2+3+...+n
  return res;
};

const res = forLoopRecur(6);
console.log("res: ", res);
