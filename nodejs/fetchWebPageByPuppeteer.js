const puppeteer = require('puppeteer')

/**
 * 使用 Puppeteer 获取网页内容
 * 对于 Node.js 16.1.6.0 版本，建议使用 Puppeteer v13.x 或 v14.x 版本，这些版本与 Node.js 16 兼容性较好。
 * npm install puppeteer@14.4.1
 * @param {string} url - 要访问的网页 URL
 * @param {Object} options - 配置选项
 * @param {number} options.timeout - 页面加载超时时间（毫秒）
 * @param {boolean} options.headless - 是否使用无头模式
 * @param {string} options.userAgent - 自定义 User-Agent
 * @param {function} options.beforeScreenshot - 截图前执行的回调函数
 * @returns {Promise<{content: string, screenshot: Buffer|null, title: string}>}
 */
async function fetchWebPageByPuppeteer(url, options = {}) {
  const {
    timeout = 30000,
    headless = true,
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    beforeScreenshot = null
  } = options

  let browser = null

  try {
    // 启动浏览器 - 无需设置 executablePath
    browser = await puppeteer.launch({
      headless: headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    })

    // 创建新页面
    const page = await browser.newPage()

    // 设置视口大小
    await page.setViewport({ width: 1280, height: 800 })

    // 设置 User-Agent
    await page.setUserAgent(userAgent)

    // 设置超时
    await page.setDefaultNavigationTimeout(timeout)

    // 访问 URL
    await page.goto(url, { waitUntil: 'networkidle2' })

    // 获取页面标题
    const title = await page.title()

    // 获取页面内容
    const content = await page.content()

    // 执行自定义操作（如果有）
    if (typeof beforeScreenshot === 'function') {
      await beforeScreenshot(page)
    }

    // 截图
    const screenshot = await page.screenshot()

    // 返回结果
    return {
      title,
      content,
      screenshot
    }
  } catch (error) {
    console.error('Puppeteer 获取网页时出错:', error)
    throw error
  } finally {
    // 关闭浏览器
    if (browser) {
      await browser.close()
    }
  }
}

// 使用示例
async function example() {
  try {
    const result = await fetchWebPageByPuppeteer('https://www.example.com', {
      timeout: 60000,
      headless: true,
      beforeScreenshot: async (page) => {
        // 例如: 等待特定元素加载
        await page.waitForSelector('h1', { timeout: 5000 })

        // 或者: 点击某个按钮
        // await page.click('button.some-class');

        // 或者: 滚动到页面底部
        // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      }
    })

    console.log('页面标题:', result.title)
    console.log('页面内容长度:', result.content.length)

    // 保存截图
    const fs = require('fs')
    fs.writeFileSync('screenshot.png', result.screenshot)
    console.log('截图已保存为 screenshot.png')
  } catch (error) {
    console.error('示例执行失败:', error)
  }
}

// example();

module.exports = { fetchWebPageByPuppeteer }
