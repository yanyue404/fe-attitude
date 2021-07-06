// 安全的获取无限多层级的数据
export const get = (path, o) => {
  try {
    return path.split('.').reduce((o, k) => o[k], o);
  } catch (error) {
    return undefined;
  }
};
