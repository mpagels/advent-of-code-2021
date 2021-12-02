import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import fetch from 'node-fetch'

const { SESSION_COOKIE } = process.env

export default async function getData(day) {
  const response = await fetch(
    `https://adventofcode.com/2021/day/${day}/input`,
    {
      headers: {
        cookie: SESSION_COOKIE,
      },
    }
  )
  return await response.text()
}
