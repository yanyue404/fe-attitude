function calculateSessionStorageSize(key) {
  try {
    // 检查是否支持 sessionStorage
    if (!window.sessionStorage) {
      throw new Error('浏览器不支持 sessionStorage')
    }

    // 获取指定 key 的值
    const value = sessionStorage.getItem(key)

    if (value === null) {
      return {
        size: 0,
        sizeKB: 0,
        sizeMB: 0,
        message: `Key "${key}" 在 sessionStorage 中不存在`
      }
    }

    // 计算字符串的字节大小（UTF-16 编码，每个字符 2 字节）
    const sizeInBytes = new Blob([value]).size

    // 转换为 KB 和 MB
    const sizeInKB = sizeInBytes / 1024
    const sizeInMB = sizeInKB / 1024

    // 浏览器 sessionStorage 通常限制在 5-10MB
    const typicalLimitMB = 5
    const isOverLimit = sizeInMB > typicalLimitMB

    return {
      size: sizeInBytes,
      sizeKB: sizeInKB.toFixed(2),
      sizeMB: sizeInMB.toFixed(2),
      isOverLimit: isOverLimit,
      message: isOverLimit
        ? `警告：当前大小 ${sizeInMB.toFixed(2)}MB 可能超过浏览器 ${typicalLimitMB}MB 限制`
        : `当前大小 ${sizeInMB.toFixed(2)}MB，低于 ${typicalLimitMB}MB 限制`
    }
  } catch (error) {
    return {
      size: 0,
      sizeKB: 0,
      sizeMB: 0,
      message: `错误：${error.message}`
    }
  }
}

// 使用示例
function checkStorageKeySize(key) {
  const result = calculateSessionStorageSize(key)
  console.log(`大小（字节）：${result.size}`)
  console.log(`大小（KB）：${result.sizeKB}`)
  console.log(`大小（MB）：${result.sizeMB}`)
  console.log(result.message)
}

// 执行检查
checkTestKeySize('vuex-store')

// 大小（字节）：17538
// 大小（KB）：17.13
// 大小（MB）：0.02
// 当前大小 0.02MB，低于 5MB 限制
