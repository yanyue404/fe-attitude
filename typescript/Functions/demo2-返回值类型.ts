function add2(x: number, y: number): number {
  return x + y;
}

let myAdd2 = function (x: number, y: number): string { return x + y; };
// : string 在此处定义函数返回值类型
// error TS2322: Type 'number' is not assignable to type 'string'

// 如果你不打算从函数返回任何内容，则可以将其标注为：void 。你通常可以删除 void， TypeScript 能推导出来：