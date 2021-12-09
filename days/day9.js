const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

import fetchDataForDay from '../services/getData.js'

async function main() {
  const listOfData = await fetchDataForDay(9)
  const matrix = listOfData
    .split('\n')
    .map((line) => line.split('').map(Number))
  matrix.pop()
  const lowPoints = []

  function isDownBigger(line, index) {
    return matrix[line][index] < matrix[line + 1][index]
  }

  function isUpBigger(line, index) {
    return matrix[line][index] < matrix[line - 1][index]
  }

  function isLeftBigger(line, index) {
    return matrix[line][index] < matrix[line][index - 1]
  }

  function isRightBigger(line, index) {
    return matrix[line][index] < matrix[line][index + 1]
  }

  function addLocation(line, index) {
    lowPoints.push(matrix[line][index])
  }

  for (let line = 0; line < matrix.length; line++) {
    // if first line
    if (line === 0) {
      for (let index = 0; index < matrix[line].length; index++) {
        // if first element in first line
        if (index === 0) {
          if (isDownBigger(line, index) && isRightBigger(line, index)) {
            addLocation(line, index)
          }
        }

        if (index > 0 && index < matrix[line].length) {
          if (
            isLeftBigger(line, index) &&
            isRightBigger(line, index) &&
            isDownBigger(line, index)
          ) {
            addLocation(line, index)
          }
        }

        if (index === matrix[line].length - 1) {
          if (isLeftBigger(line, index) && isDownBigger(line, index)) {
            addLocation(line, index)
          }
        }
      }
    }
    // if not first and not last line

    if (line > 0 && line < matrix.length - 1) {
      for (let index = 0; index < matrix[line].length; index++) {
        if (index === 0) {
          if (
            isUpBigger(line, index) &&
            isDownBigger(line, index) &&
            isRightBigger(line, index)
          ) {
            addLocation(line, index)
          }
        }

        if (index > 0 && index < matrix[line].length) {
          if (
            isUpBigger(line, index) &&
            isDownBigger(line, index) &&
            isRightBigger(line, index) &&
            isLeftBigger(line, index)
          ) {
            addLocation(line, index)
          }
        }

        if (index === matrix[line].length - 1) {
          if (
            isUpBigger(line, index) &&
            isDownBigger(line, index) &&
            isLeftBigger(line, index)
          ) {
            addLocation(line, index)
          }
        }
      }
    }

    // if  last line
    if (line === matrix.length - 1) {
      for (let index = 0; index < matrix[line].length; index++) {
        // if first element in first line
        if (index === 0) {
          if (isUpBigger(line, index) && isRightBigger(line, index)) {
            addLocation(line, index)
          }
        }

        if (index > 0 && index < matrix[line].length) {
          if (
            isLeftBigger(line, index) &&
            isRightBigger(line, index) &&
            isUpBigger(line, index)
          ) {
            addLocation(line, index)
          }
        }

        if (index === matrix[line].length - 1) {
          if (isLeftBigger(line, index) && isUpBigger(line, index)) {
            addLocation(line, index)
          }
        }
      }
    }
  }

  console.log(
    'What is the sum of the risk levels of all low points on your heightmap: ',
    lowPoints.map((points) => points + 1).reduce((prev, cur) => prev + cur, 0)
  )
}
main()
