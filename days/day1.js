import fetchDataForDay from '../services/getData.js'

async function main() {
  // setup
  const depthMeasurements = await fetchDataForDay(1)
  const REDUCERSTART = { previousMeasurement: 0, largerCount: 0 }

  // first exercise
  const reducer = (prev, cur, index) => {
    if (index !== 0 && cur > prev.previousMeasurement) {
      prev.largerCount++
    }
    return { ...prev, previousMeasurement: cur }
  }

  const result_1 = depthMeasurements.reduce(reducer, REDUCERSTART)

  console.log(
    'How many measurements are larger than the previous measurement:',
    result_1.largerCount
  )

  // second exercise

  const getThreeMeasurementSums = (_, index, array) => {
    if (index < array.length - 2) {
      const sum = array[index] + array[index + 1] + array[index + 2]
      return sum
    }
  }

  const result_2 = depthMeasurements
    .map(getThreeMeasurementSums)
    .reduce(reducer, REDUCERSTART)

  console.log(
    'How many sums are larger than the previous sum:',
    result_2.largerCount
  )
}

main()
