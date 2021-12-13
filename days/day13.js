import fetchDataForDay from '../services/getData.js'

const testData = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`

async function main() {
  const listOfData = await fetchDataForDay(13)
  console.log(listOfData)

  const foldInstructions = listOfData
    .split('\n')
    .slice(-13)
    .slice(0, -1)
    .map((instructions) => instructions.split(' ')[2].split('='))

  console.log(foldInstructions)
  const coordinates = listOfData
    .split('\n')
    .slice(0, -13)
    .slice(0, -1)
    .map((coord) => coord.split(',').map(Number))

  const x = Math.max(...coordinates.map((coord) => coord[0]))
  const y = Math.max(...coordinates.map((coord) => coord[1]))

  const matrix = Array(y + 1)

  for (let i = 0; i <= y; i++) {
    matrix[i] = Array(x + 1).fill('.')
  }

  coordinates.forEach(setDots)

  function setDots(coord) {
    const [x1, y1] = coord
    matrix[y1][x1] = '#'
  }

  /* const foldY =  foldInstructions[0][1]

  const aboveFold = matrix.filter((_, index) => index < 7)
  const downFold = matrix.filter((_, index) => index > 7).reverse()

  for (let i = downFold.length - 1; i >= 0; i--) {
    const line = aboveFold.length - 1 - (downFold.length - 1 - i)
    downFold[i].forEach((dot, index) => {
      if (dot === '#') {
        aboveFold[line][index] = dot
      }
    })
  }
 */

  const foldX = 655

  const leftFold = matrix.map((line) =>
    line.filter((_, index) => index < foldX)
  )

  const rightFold = matrix.map((line) =>
    line.filter((_, index) => index > foldX).reverse()
  )
  /* 
console.log('left', leftFold)
console.log('right', rightFold) */

  rightFold.forEach((line, LineIndex) => {
    for (let i = line.length; i >= 0; i--) {
      line.forEach((dot, index) => {
        const position =
          leftFold[LineIndex].length - 1 - (line.length - 1 - index)
        if (dot === '#') {
          leftFold[LineIndex][position] = dot
        }
      })
    }
  })

  const result = { '#': 0 }
  leftFold.forEach((line) => {
    line.forEach((dot) => {
      if (dot === '#') {
        result[dot]++
      }
    })
  })

  console.log(
    'How many dots are visible after completing just the first fold instruction on your transparent paper:',
    result
  )
}
main()
/* console.log(leftFold) */
