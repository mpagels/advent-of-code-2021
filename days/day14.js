let template = 'VFHKKOKKCPBONFHNPHPN'

const instructions = `VS -> B
HK -> B
FO -> P
NC -> F
VN -> C
BS -> O
HS -> K
NS -> C
CV -> P
NV -> C
PH -> H
PB -> B
PK -> K
HF -> P
FV -> C
NN -> H
VO -> K
VP -> P
BC -> B
KK -> S
OK -> C
PN -> H
SB -> V
KO -> P
KH -> C
KS -> S
FP -> B
PV -> B
BO -> C
OS -> H
NB -> S
SP -> C
HN -> N
FN -> B
PO -> O
FS -> O
NH -> B
SO -> P
OB -> S
KC -> C
OO -> H
BB -> V
SC -> F
NP -> P
SH -> C
BH -> O
BP -> F
CC -> S
BN -> H
SS -> P
BF -> B
VK -> P
OV -> H
FC -> S
VB -> S
PF -> N
HH -> O
HC -> V
CH -> B
HP -> H
FF -> H
VF -> V
CS -> F
KP -> F
OP -> H
KF -> F
PP -> V
OC -> C
PS -> F
ON -> H
BK -> B
HV -> S
CO -> K
FH -> C
FB -> F
OF -> V
SN -> S
PC -> K
NF -> F
NK -> P
NO -> P
CP -> P
CK -> S
HB -> H
BV -> C
SF -> K
HO -> H
OH -> B
KV -> S
KN -> F
SK -> K
VH -> S
CN -> S
VC -> P
CB -> H
SV -> S
VV -> P
CF -> F
FK -> F
KB -> V
`

const obj = {}

const x = instructions
  .split('\n')
  .map((instruction) => instruction.split(' -> '))

/* customInstructions.pop() */
x.forEach((z) => {
  if (z[0] !== '') {
    obj[z[0]] = z[1]
  }
})

let list = []
let newTemplate = []

for (let step = 0; step < 40; step++) {
  for (let i = 0; i < template.length - 1; i++) {
    list.push(template[i] + template[i + 1])
  }

  list.forEach((chars, index) => {
    const between = obj[chars]
    if (index > 0) {
      newTemplate.push(between + chars[1])
    } else newTemplate.push(chars[0] + between + chars[1])
  })

  template = newTemplate.join('')
  list.length = []
  newTemplate = []
}

let count = {}
for (let s of template)
  if (!count[s]) count[s] = 1
  else count[s] = count[s] + 1

const counts = Object.values(count)

console.log(
  'What do you get if you take the quantity of the most common element and subtract the quantity of the least common element: ',
  Math.max(...counts) - Math.min(...counts)
)
