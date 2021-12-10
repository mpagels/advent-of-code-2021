import fetchDataForDay from '../services/getData.js'
const testData = `{([(<{}[<>[]}>{[]{[(<()>
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{`

const testData2 = '<{([([[(<>()){}]>(<<{{'

async function main() {
  // setup

  const listOfData = await fetchDataForDay(10)
  const close = ')]}>'.split('')

  const data = listOfData.split('\n').map((line) => line.split(''))
  const data2 = testData2.split('')
  data.pop()

  let stack = []
  const wrongChars = []

  const illegalCalculation = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  function checkIsCloseChar(char) {
    return close.includes(char)
  }

  function isCorrespondingClosingChar(char) {
    const correspondingChar = {
      ')': '(',
      ']': '[',
      '}': '{',
      '>': '<',
    }
    return correspondingChar[char]
  }

  for (let i = 0; i < data.length; i++) {
    const line = data[i]
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (checkIsCloseChar(char)) {
        const lastCharInStack = stack.pop()
        if (lastCharInStack !== isCorrespondingClosingChar(char)) {
          wrongChars.push(char)
          stack.length = []
          break
        }
      } else {
        stack.push(char)
      }
    }
  }

  const result = wrongChars.reduce((prev, cur) => {
    return (prev += illegalCalculation[cur])
  }, 0)
  console.log('What is the total syntax error score for those errors: ', result)

  // exercise 2

  // setup

  const testDataAll = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

  const data3 = testDataAll.split('\n').map((line) => line.split(''))
  const unfinishedLines = []

  const correspondingClosingChar = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  }

  const calculation = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  const testData3 = '{<[[]]>}<{[{[{[]{()[[[]'.split('')
  console.log(testData3)

  // remove wrong lines

  let isBreak = false
  for (let i = 0; i < data.length; i++) {
    const line = data[i]
    stack.length = []
    isBreak = false
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (checkIsCloseChar(char)) {
        const lastCharInStack = stack.pop()
        if (lastCharInStack !== isCorrespondingClosingChar(char)) {
          wrongChars.push(char)
          stack.length = []
          isBreak = true
          break
        }
      } else {
        stack.push(char)
      }
    }
    if (isBreak === false) {
      unfinishedLines.push(line)
    }
  }

  // calculate closing logic
  let stack2 = []
  const closingStacks = []
  let closingStack = []

  for (let i = 0; i < unfinishedLines.length; i++) {
    const line = unfinishedLines[i]
    stack2 = []
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (checkIsCloseChar(char)) {
        stack2.pop()
      } else {
        stack2.push(char)
      }
    }

    const length = stack2.length
    closingStack = []
    for (let i = 0; i < length; i++) {
      const lastOpenChar = stack2.pop()
      closingStack.push(correspondingClosingChar[lastOpenChar])
    }

    closingStacks.push(closingStack)
  }

  // calculate score
  const results = []

  closingStacks.forEach((closingStack) => {
    const result = closingStack.reduce((prev, cur) => {
      return prev * 5 + calculation[cur]
    }, 0)
    results.push(result)
  })

  const sortedResult = results.sort((a, b) => a - b)
  const lengthOfResult = sortedResult.length
  const middleIndex = lengthOfResult / 2 + 0.5
  console.log('What is the middle score: ', sortedResult[middleIndex - 1])
}

main()
