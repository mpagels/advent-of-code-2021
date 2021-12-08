import fetchDataForDay from '../services/getData.js'

async function main() {
  // setup
  const listOfData = await fetchDataForDay(8)
  const data = listOfData.split('\n')
  const entries = data.map((entry) => entry.split(' | '))
  entries.pop()

  // exercise 1
  const justOutputs = entries.map((entry) => entry[1])
  const justOutputtNumbers = justOutputs.map((output) => output.split(' '))
  const justCorrectNumbers = []
  justOutputtNumbers.forEach((elements) => {
    elements.forEach((element) => {
      if (
        element.length === 2 ||
        element.length === 3 ||
        element.length === 4 ||
        element.length === 7
      ) {
        justCorrectNumbers.push(element)
      }
    })
  })

  console.log(
    'In the output values, how many times do digits 1, 4, 7, or 8 appear: ',
    justCorrectNumbers.length
  )
}

main()
