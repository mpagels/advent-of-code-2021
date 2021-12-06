async function main() {
  const input =
    '3,4,3,1,2,1,5,1,1,1,1,4,1,2,1,1,2,1,1,1,3,4,4,4,1,3,2,1,3,4,1,1,3,4,2,5,5,3,3,3,5,1,4,1,2,3,1,1,1,4,1,4,1,5,3,3,1,4,1,5,1,2,2,1,1,5,5,2,5,1,1,1,1,3,1,4,1,1,1,4,1,1,1,5,2,3,5,3,4,1,1,1,1,1,2,2,1,1,1,1,1,1,5,5,1,3,3,1,2,1,3,1,5,1,1,4,1,1,2,4,1,5,1,1,3,3,3,4,2,4,1,1,5,1,1,1,1,4,4,1,1,1,3,1,1,2,1,3,1,1,1,1,5,3,3,2,2,1,4,3,3,2,1,3,3,1,2,5,1,3,5,2,2,1,1,1,1,5,1,2,1,1,3,5,4,2,3,1,1,1,4,1,3,2,1,5,4,5,1,4,5,1,3,3,5,1,2,1,1,3,3,1,5,3,1,1,1,3,2,5,5,1,1,4,2,1,2,1,1,5,5,1,4,1,1,3,1,5,2,5,3,1,5,2,2,1,1,5,1,5,1,2,1,3,1,1,1,2,3,2,1,4,1,1,1,1,5,4,1,4,5,1,4,3,4,1,1,1,1,2,5,4,1,1,3,1,2,1,1,2,1,1,1,2,1,1,1,1,1,4'
  const data = input.split(',')

  const days = Array(9).fill(0)

  data.forEach((number) => {
    days[number]++
  })

  function calculateFishPopulationAfter(day) {
    const days2 = [...days]
    let day0 = days2[0]

    for (let j = 0; j < day; j++) {
      for (let i = 1; i <= 8; i++) {
        days2[i - 1] = days2[i]
      }

      days2[6] += day0
      days2[8] = day0

      day0 = days2[0]
    }

    return days2.reduce((prev, cur) => {
      return prev + cur
    })
  }
  console.log(
    'How many lanternfish would there be after 80 days:',
    calculateFishPopulationAfter(80)
  )
  console.log(
    'How many lanternfish would there be after 256 days:',
    calculateFishPopulationAfter(256)
  )
}

main()
