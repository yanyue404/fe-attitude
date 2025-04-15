/**
 * Trims whitespace from both ends of a string.
 * @param {string} str - The string to trim.
 * @returns {string} - The trimmed string.
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * Replaces all occurrences of a substring within a string.
 * @param {string} str - The original string.
 * @param {string} search - The substring to search for.
 * @param {string} replacement - The replacement substring.
 * @returns {string} - The new string with all occurrences replaced.
 */
export function replaceAll(str, search, replacement) {
  return str.replace(new RegExp(search, 'g'), replacement)
}

/**
 * Checks if a string contains a substring.
 * @param {string} str - The original string.
 * @param {string} value - The substring to search for.
 * @returns {boolean} - True if the substring is found, false otherwise.
 */
export function isContains(str, value) {
  return str.indexOf(value) > -1
}

/**
 * Splits a string into an array of characters.
 * @param {string} str - The original string.
 * @returns {Array} - An array of characters, each paired with a boolean indicating if it's a Chinese character.
 */
export function strToChars(str) {
  const chars = []
  for (let i = 0; i < str.length; i++) {
    chars[i] = [str.charAt(i), isCHS(str, i)]
  }
  return chars
}

/**
 * Checks if a character at a given index in a string is a Chinese character.
 * @param {string} str - The original string.
 * @param {number} i - The index of the character.
 * @returns {boolean} - True if the character is a Chinese character, false otherwise.
 */
export function isCHS(str, i) {
  const charCode = str.charCodeAt(i)
  return charCode > 255 || charCode < 0
}

/**
 * Splits a string into chunks of a specified size.
 * @param {string} word - The string to split.
 * @param {number} num - The size of each chunk.
 * @returns {Array} - An array of string chunks.
 */
export function splitWords(word, num) {
  const slices = []
  const chars = word.split('')
  while (chars.length > 0) {
    slices.push(chars.splice(0, num).join(''))
  }
  return slices
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The original string.
 * @returns {string} - The string with the first letter capitalized.
 */
export function upperCaseFirstLetter(string) {
  if (typeof string !== 'string') return string
  return string.replace(/^./, match => match.toUpperCase())
}

// 压缩或截断字符串
export function truncateString(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

// 生成随机颜色代码
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}