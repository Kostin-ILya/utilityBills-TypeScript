const electricityUserData = {
  readings: 95,
  units: 'kWt',
  mode: 'double',
}

const waterUserData = {
  readings: 3,
  units: 'm3',
}

const elRate: number = 0.45
const wRate: number = 2

const monthPayments: number[] = [0, 0] // [electricity, water]

const calculatePayments = (
  { readings: elReadings, mode: elMode }: { readings: number; mode: string },
  { readings: wReadings }: { readings: number },
  elRate: number,
  wRate: number
): void => {
  if (elMode === 'double' && elReadings < 50) {
    monthPayments[0] = elReadings * elRate * 0.7
  } else {
    monthPayments[0] = elReadings * elRate
  }

  monthPayments[1] = wReadings * wRate
}

calculatePayments(electricityUserData, waterUserData, elRate, wRate)

const sendInvoice = (
  [elPayments, wPayments]: number[],
  { readings: elReadings, units: elUnits }: { readings: number; units: string },
  { readings: wReadings, units: wUnits }: { readings: number; units: string }
): string => {
  const text: string = `    Hello!
    This month you used ${elReadings} ${elUnits} of electricity
    It will cost: ${elPayments}€

    This month you used ${wReadings} ${wUnits} of water
    It will cost: ${wPayments}€`

  return text
}

const invoice = sendInvoice(monthPayments, electricityUserData, waterUserData)

console.log(invoice)
