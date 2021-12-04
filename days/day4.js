import fetchDataForDay from '../services/getData.js'
import { promises as fs } from 'fs'

async function main() {
  // setup

  //   let test = await fs.readFile('day4.txt', 'utf8')
  //   const positionTest = test
  //     .trim()
  //     .split('\n')
  //     .map((data) => data)
  //   const drawnNumbersTest = positionTest[0].split(',').map(Number)

  const listOfData = await fetchDataForDay(4)
  const positions = listOfData.split('\n').map((data) => data)
  const drawnNumbers = positions[0].split(',').map(Number)

  let boards = []
  const board = []

  positions.slice(2).forEach((line, index, array) => {
    if (line !== '') {
      const boardLine = []
      line.split(' ').forEach((number) => {
        if (number.trim() !== '') {
          boardLine.push([{ number: Number(number), isMarked: false }])
        }
      })
      board.push(boardLine)
      if (index === array.length - 1) {
        boards.push([...board])
      }
    } else {
      boards.push([...board])
      board.length = 0
    }
  })

  // exercise 1

  let winnerBoard
  let winnerNumber
  let hasWinner = false
  for (let number of drawnNumbers) {
    for (let board of boards) {
      for (let row of board) {
        for (let entry of row) {
          if (entry[0].number === number) {
            entry[0].isMarked = true
          }
        }
      }
      if (checkForWinner(board)) {
        winnerBoard = board
        winnerNumber = number
        hasWinner = true
        break
      }
    }
    if (hasWinner) {
      break
    }
  }

  const sumOfUnmarkedNumbers = winnerBoard.reduce((prev, cur) => {
    const rowSum = cur
      .filter((data) => !data[0].isMarked)
      .reduce((prev, cur) => {
        return prev + cur[0].number
      }, 0)
    return prev + rowSum
  }, 0)

  console.log('winerNummer exercise 1: ', winnerNumber)
  console.log(
    'What will your final score be if you choose that board:',
    sumOfUnmarkedNumbers * winnerNumber
  )
}

main()

function logBoard(board) {
  for (let row of board) {
    for (let entry of row) {
      console.log(entry[0].number + ' ' + '\r')
    }
    console.log('\n')
  }
}

function checkForWinner(board) {
  const isRowWinner = board.some((row) =>
    row.every((entry) => entry[0].isMarked)
  )
  let isColumnWinner = false
  for (let i = 0; i < board.length; i++) {
    const columns = [
      board[0][i],
      board[1][i],
      board[2][i],
      board[3][i],
      board[4][i],
    ]
    isColumnWinner = columns.every((entry) => entry[0].isMarked)
    if (isColumnWinner) {
      break
    }
  }
  return [isRowWinner, isColumnWinner].some((check) => check)
}
