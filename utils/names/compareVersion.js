//   compareVersion("1.11.0", "1.9.9"); // 1
export function compareVersion(currVersion, comparedVersion) {
  if (currVersion && comparedVersion) {
    let v1 = currVersion.split('.')
    let v2 = comparedVersion.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  }
  return -1
}
