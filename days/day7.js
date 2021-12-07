import fetchDataForDay from '../services/getData.js'

async function main() {
  const listOfData = await fetchDataForDay(7)
  const data = listOfData.split(',').map(Number)

  const MIN = Math.min(...data)
  const MAX = Math.max(...data)

  const fuel = []

  function calculateFuel(toPoint) {
    const fuel = []
    data.forEach((position) => {
      fuel.push(Math.abs(position - toPoint))
    })
    return fuel.reduce((prev, cur) => prev + cur, 0)
  }

  for (let i = MIN; i < MAX + 1; i++) {
    fuel.push(calculateFuel(i))
  }

  console.log(
    'How much fuel must they spend to align to that position: ',
    Math.min(...fuel)
  )
  const fuel2 = []

  function calculateFuel2(toPoint) {
    const fuel = []

    data.forEach((position) => {
      const distance = Math.abs(position - toPoint)

      fuel.push((distance / 2 + 0.5) * distance)
    })
    return fuel.reduce((prev, cur) => prev + cur, 0)
  }

  for (let i = MIN; i < MAX + 1; i++) {
    fuel2.push(calculateFuel2(i))
  }

  console.log(
    'How much fuel must they spend to align to that position: ',
    Math.min(...fuel2)
  )
}

main()
