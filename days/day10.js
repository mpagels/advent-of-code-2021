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
}

main()
