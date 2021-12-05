import fetchDataForDay from '../services/getData.js'

async function main() {
  const listOfData = await fetchDataForDay(5)
  const lines = listOfData
    .split('\n')
    .map((calc) => calc.split('->'))
    .map((line) => line.map((entry) => entry.split(',').map(Number)))
  lines.pop()
  let x = 0
  let y = 0

  // get x and y for matrix build
  lines.forEach((line) => {
    if (line[0][0] > x) {
      x = line[0][0]
    }
    if (line[0][1] > y) {
      y = line[0][1]
    }
    if (line[1][0] > x) {
      x = line[1][0]
    }
    if (line[1][0] > y) {
      y = line[1][1]
    }
  })

  const matrix = []
  for (let i = 0; i <= y; i++) {
    matrix.push(Array(x + 1).fill(0))
  }

  // draw lines
  lines.forEach((line) => {
    if (line[0][0] === line[1][0]) {
      const y1 = line[0][1]
      const y2 = line[1][1]
      const x = line[0][0]
      const startY = Math.min(...[y1, y2])
      const endY = Math.max(...[y1, y2])

      for (let y = startY; y <= endY; y++) {
        matrix[y][x]++
      }
    } else if (line[0][1] === line[1][1]) {
      const x1 = line[0][0]
      const x2 = line[1][0]
      const sorted = [x1, x2].sort()

      const y = line[0][1]
      const startX = Math.min(...[x1, x2])
      const endX = Math.max(...[x1, x2])
      for (let x = startX; x <= endX; x++) {
        matrix[y][x]++
      }
    }
  })

  // count every overlapping
  const result = matrix.reduce((prev, cur, index) => {
    const arraySum = cur.reduce((prev, cur) => {
      if (cur > 1) {
        return prev + 1
      }
      return prev
    }, 0)
    return prev + arraySum
  }, 0)

  console.log('At how many points do at least two lines overlap: ', result)
}
main()
