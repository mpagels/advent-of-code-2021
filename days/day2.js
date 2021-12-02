import fetchDataForDay from '../services/getData.js'

async function main() {}

// setup
const listOfData = await fetchDataForDay(2)
const commands = listOfData
  .split('\n')
  .map((data) => data.split(' '))
  .filter((data) => data[0] !== '')
  .map((data) => [data[0], Number(data[1])])
const REDUCERSTART = { horizontal: 0, depth: 0, aim: 0 }

// exercise 1
const result = commands.reduce((prev, cur) => {
  const move = getMovement(cur[0])
  if (cur[0] === 'up') {
    prev[move] -= cur[1]
  } else {
    prev[move] += cur[1]
  }
  return { ...prev }
}, REDUCERSTART)
console.log(
  'What do you get if you multiply your final horizontal position by your final depth:',
  result.horizontal * result.depth
)

// exercise 2

REDUCERSTART.horizontal = 0

const result_1 = commands.reduce((prev, cur) => {
  const move = cur[0]
  if (move === 'down') {
    prev.aim += cur[1]
  }
  if (move === 'up') {
    prev.aim -= cur[1]
  }
  if (move === 'forward') {
    prev.horizontal += cur[1]
    prev.depth = prev.depth + prev.aim * cur[1]
  }

  return { ...prev }
}, REDUCERSTART)

console.log(
  'What do you get if you multiply your final horizontal position by your final depth:',
  result_1.horizontal * result_1.depth
)
main()

// helper function
function getMovement(move) {
  const movement = { forward: 'horizontal', up: 'depth', down: 'depth' }
  return movement[move]
}
