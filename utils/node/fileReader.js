const PDFParser = require('pdf2json')
const fs = require('fs')
const mammoth = require('mammoth')

/**
 * 读取 PDF 文件内容
 * @param {string} filePath - PDF 文件的路径
 * @returns {Promise<string>} - 返回包含 PDF 内容的文本
 */
const readPdfContent = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()

    // 处理解析完成事件
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      try {
        // 提取文本内容
        const pages = pdfData.formImage.Pages
        let pdfText = ''

        pages.forEach((page) => {
          page.Texts.forEach((text) => {
            text.R.forEach((item) => {
              pdfText += decodeURIComponent(item.T) + ' '
            })
          })
        })

        resolve(pdfText.trim())
      } catch (error) {
        reject(`Error parsing PDF content: ${error.message}`)
      }
    })

    // 处理错误事件
    pdfParser.on('pdfParser_dataError', (error) => {
      reject(`PDF parsing error: ${error.parserError}`)
    })

    // 加载 PDF 文件
    pdfParser.loadPDF(filePath)
  })
}

/**
 * 读取 .docx 文件内容
 * @param {string} filePath - .docx 文件路径
 * @returns {Promise<string>} - 返回包含文档内容的文本
 */
const readDocxContent = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(`无法读取文件: ${err.message}`)
      }

      mammoth
        .extractRawText({ buffer: data })
        .then((result) => resolve(result.value.trim()))
        .catch((error) => reject(`解析 .docx 文件失败: ${error.message}`))
    })
  })
}

module.exports = {
  readDocxContent,
  readPdfContent
}
