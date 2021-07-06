// 将多维数组转化为一维数组 （即：数组扁平化）
export const flat = arr =>
  arr.reduce((prev, cur, index, list) => {
    if (Array.isArray(cur)) {
      return prev.concat(...flat(cur));
    }
    return prev.concat(cur);
  }, []);
