<!-- PROJECT LOGO -->
<br />
<p align="center">

![""](docs/logo.png)

  <h3 align="center">Advent of code</h3>

  <p align="center">
   Solutions to 2021 <a href="https://adventofcode.com/">Advent of Code</a> tasks
  </p>
</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mpagels/advent-of-code-2021.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Log into your advent-of-code account with your browser of choice

   ```
   https://adventofcode.com/2021
   ```

4. With the browser dev tools extract your current `session cookie`. Should look like:

   ```
   session:"da251cff98f73729df64e2bc1663d61ca3fa78d74ec99c449fee693f7836f91da251cff98f73729df64e2bc1663d61c"
   ```

5. Insert the cookie information into a `.env` file

   ```
   SESSION_COOKIE="session=da251cff98f73729df64e2bc1663d61ca3fa78d74ec99c449fee693f7836f91da251cff98f73729df64e2bc1663d61c"
   ```

6. cd in a day directory and run the script

   ```sh
   node day1.js
   ```
