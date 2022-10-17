export function pipe(initialValue, ...funcs) {
  return funcs.reduce((preValue, curFunc) => curFunc(preValue), initialValue)
}
