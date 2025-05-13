const fs = require('fs')
const path = require('path')

const textFilePath = path.join(__dirname, 'extracted_text.txt')
const jsonFilePath = path.join(__dirname, 'qaList.json')

try {
  const data = fs.readFileSync(textFilePath, 'utf8')
  const lines = data.split(/\r?\n/) // Split by new line, handling Windows/Unix endings

  const qaList = []
  let currentQuestion = null
  let currentType = null // 'single', 'multiple', 'true_false'
  let questionBuffer = '' // To handle multi-line questions

  const typeMap = {
    单选题: 'single',
    多选题: 'multiple',
    判断题: 'true_false'
  }

  const optionRegex = /^([A-Z]+)[、．.)\s](.*)/ // Match options like A、 B. C) D
  const answerRegex = /^答案：\s*([A-Z]+(?:\s*[A-Z]+)*|正确|错误)/ // Match single/multiple answers or true/false text
  const questionStartRegex = /^(\d+)[、．.)\s](.*)/ // Match question number like 1. 2、 3)
  const sectionHeaderRegex = /^[一二三四五六七八九十]+、(单选题|多选题|判断题)/

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    if (!line) continue // Skip empty lines

    const sectionMatch = line.match(sectionHeaderRegex)
    if (sectionMatch) {
      currentType = typeMap[sectionMatch[1]]
      if (currentQuestion) {
        // Save the last question of the previous section
        // Ensure the previous question is valid before pushing
        if (currentQuestion.question && currentQuestion.answer !== null) {
          qaList.push(currentQuestion)
        } else {
          console.warn(`Skipping incomplete question before section ${sectionMatch[1]}:`, currentQuestion)
        }
        currentQuestion = null
        questionBuffer = ''
      }
      console.log(`--- Processing Section: ${sectionMatch[1]} (${currentType}) ---`)
      continue
    }

    if (!currentType) continue // Skip lines before the first section header

    const questionMatch = line.match(questionStartRegex)
    const answerMatch = line.match(answerRegex)
    const optionMatch = line.match(optionRegex)

    if (questionMatch) {
      // Start of a new question
      if (currentQuestion) {
        // Save the previous question first
        // Ensure the previous question is valid before pushing
        if (currentQuestion.question && currentQuestion.answer !== null) {
          qaList.push(currentQuestion)
        } else {
          console.warn(`Skipping incomplete question ${currentQuestion?.number}:`, currentQuestion)
        }
      }
      questionBuffer = questionMatch[2].trim()
      currentQuestion = {
        type: currentType,
        number: parseInt(questionMatch[1], 10),
        question: '', // Will be filled later
        options: {},
        answer: null
      }
      // Check if next lines are part of the question
      let nextLineIndex = i + 1
      while (
        nextLineIndex < lines.length &&
        lines[nextLineIndex].trim() &&
        !lines[nextLineIndex].trim().match(optionRegex) &&
        !lines[nextLineIndex].trim().match(answerRegex) &&
        !lines[nextLineIndex].trim().match(questionStartRegex) &&
        !lines[nextLineIndex].trim().match(sectionHeaderRegex)
      ) {
        questionBuffer += '\n' + lines[nextLineIndex].trim() // Append next line to question buffer, preserve line breaks
        nextLineIndex++
        i++ // Move the main loop index forward
      }
      currentQuestion.question = questionBuffer
    } else if (currentQuestion && optionMatch) {
      // Add option to the current question
      let optionText = optionMatch[2].trim()
      // Check if next lines are part of the option text (if they don't start with another option/answer/question)
      let nextLineIndex = i + 1
      while (
        nextLineIndex < lines.length &&
        lines[nextLineIndex].trim() &&
        !lines[nextLineIndex].trim().match(optionRegex) &&
        !lines[nextLineIndex].trim().match(answerRegex) &&
        !lines[nextLineIndex].trim().match(questionStartRegex) &&
        !lines[nextLineIndex].trim().match(sectionHeaderRegex)
      ) {
        optionText += '\n' + lines[nextLineIndex].trim() // Append next line to option, preserve line breaks
        nextLineIndex++
        i++ // Move the main loop index forward
      }
      currentQuestion.options[optionMatch[1]] = optionText
    } else if (currentQuestion && answerMatch) {
      // Add answer to the current question
      let answerText = answerMatch[1].trim(); // This can be 'A', 'B', '正确', '错误' or 'ABC' etc for multiple choice
      
      if (currentType === 'true_false') {
        if (answerText === '正确') {
          currentQuestion.answer = 'A';
        } else if (answerText === '错误') {
          currentQuestion.answer = 'B';
        } else { // It's already 'A' or 'B' (or potentially other single chars if format changes)
          currentQuestion.answer = answerText; // Use directly if it's A, B
        }
        // Add default options for true/false if not present (though they usually are for this format)
        if (Object.keys(currentQuestion.options).length === 0) {
          currentQuestion.options['A'] = '正确';
          currentQuestion.options['B'] = '错误';
        }
      } else { // For single and multiple choice
        currentQuestion.answer = answerText.replace(/\s+/g, ''); 
      }
      // Don't push yet, wait for the next question or end of file/section
    } else if (currentQuestion && currentQuestion.question && !answerMatch && !optionMatch && !questionMatch) {
      // Handle cases where question text spans multiple lines and wasn't fully captured initially
      // Append to existing question text if it seems to be a continuation
      if (currentQuestion.question && !currentQuestion.answer && Object.keys(currentQuestion.options).length === 0) {
        currentQuestion.question += '\n' + line
      } else if (Object.keys(currentQuestion.options).length > 0 && !currentQuestion.answer) {
        // Maybe it's part of the last option? Difficult to be certain.
        // Let's ignore these lines for now to avoid incorrect assignments.
        // console.warn(`Unhandled line for question ${currentQuestion.number} (after options): ${line}`);
      } else {
        // console.warn(`Unhandled line for question ${currentQuestion.number}: ${line}`);
      }
    }
  }

  // Add the last question from the loop
  if (currentQuestion) {
    // Ensure the last question is valid before pushing
    if (currentQuestion.question && currentQuestion.answer !== null) {
      qaList.push(currentQuestion)
    } else {
      console.warn(`Skipping incomplete last question ${currentQuestion?.number}:`, currentQuestion)
    }
  }

  // Write to JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify(qaList, null, 2), 'utf8')
  console.log(`Successfully processed ${qaList.length} questions and saved to ${jsonFilePath}`)
} catch (error) {
  console.error('Error processing file:', error)
}
