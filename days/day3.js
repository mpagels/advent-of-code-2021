import fetchDataForDay from '../services/getData.js'

async function main() {
  // setup
  const listOfData = await fetchDataForDay(3)
  const positions = listOfData.split('\n').map((data) => data)

  let REDUCERSTART = {
    0: { nulls: 0, ones: 0 },
    1: { nulls: 0, ones: 0 },
    2: { nulls: 0, ones: 0 },
    3: { nulls: 0, ones: 0 },
    4: { nulls: 0, ones: 0 },
    5: { nulls: 0, ones: 0 },
    6: { nulls: 0, ones: 0 },
    7: { nulls: 0, ones: 0 },
    8: { nulls: 0, ones: 0 },
    9: { nulls: 0, ones: 0 },
    10: { nulls: 0, ones: 0 },
    11: { nulls: 0, ones: 0 },
  }

  // exercise 1

  const countOfNullsAndOnes = positions.reduce((prev, numberAsString) => {
    numberAsString.split('').forEach((number, index) => {
      if (Number(number) === 0) {
        prev[index].nulls++
      } else {
        prev[index].ones++
      }
    })

    return prev
  }, REDUCERSTART)

  const { gamaRate, epsilonRate } = generateRate(countOfNullsAndOnes)
  const gamaNumber = convertArrayToNumber(gamaRate)
  const psilionNumber = convertArrayToNumber(epsilonRate)
  const consumption = gamaNumber * psilionNumber
  console.log('What is the power consumption of the submarine:', consumption)

  // exercise 2

  resetReducerStart()

  let oxygen = [...positions]
  let run = 0

  while (oxygen.length > 1) {
    const result = oxygen.reduce((prev, cur) => {
      cur.split('').forEach((number, index) => {
        if (index === run && Number(number) === 0) {
          prev.nulls++
        } else if (index === run && Number(number) === 1) {
          prev.ones++
        }
      })
      return prev
    }, REDUCERSTART)

    let newList
    if (result.ones >= result.nulls) {
      newList = oxygen.filter((number) => Number(number[run]) === 1)
    } else {
      newList = oxygen.filter((number) => Number(number[run]) === 0)
    }
    oxygen = [...newList]
    run++
    resetReducerStart()
  }

  let co2 = [...positions]
  run = 0
  resetReducerStart()

  while (co2.length > 1) {
    const result = co2.reduce((prev, cur) => {
      cur.split('').forEach((number, index) => {
        if (index === run && Number(number) === 0) {
          prev.nulls++
        } else if (index === run && Number(number) === 1) {
          prev.ones++
        }
      })
      return prev
    }, REDUCERSTART)

    let newList
    if (result.nulls <= result.ones) {
      newList = co2.filter((number) => Number(number[run]) === 0)
    } else {
      newList = co2.filter((number) => Number(number[run]) === 1)
    }
    co2 = [...newList]
    run++
    resetReducerStart()
  }

  const co2bit = convertArrayToNumber(co2)
  const oxygenBit = convertArrayToNumber(oxygen)
  console.log(
    'What is the life support rating of the submarine',
    co2bit * oxygenBit
  )

  // helper function

  function generateRate(countOfNullsAndOnes) {
    const gamaRate = []
    const epsilonRate = []

    for (let i = 0; i < 12; i++) {
      const nullAndOnes = countOfNullsAndOnes[i]
      if (nullAndOnes.nulls > nullAndOnes.ones) {
        gamaRate.push(0)
        epsilonRate.push(1)
      } else {
        gamaRate.push(1)
        epsilonRate.push(0)
      }
    }

    return { gamaRate, epsilonRate }
  }

  function convertArrayToNumber(array) {
    return Number(`0b${array.join('')}`.toString(10))
  }

  function resetReducerStart() {
    REDUCERSTART.nulls = 0
    REDUCERSTART.ones = 0
  }
}

main()
