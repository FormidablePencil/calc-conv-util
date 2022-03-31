import Calculator from './Calculator';

test('try to calculate with all operation', async () => {
  const convertedData = [['num1', 3], ['num2', 4]];
  const calculator = new Calculator(convertedData!)

  for (const operation of ["/", "-", "+", "*"]) {
    expect(typeof calculator["calculateWithString"](operation) === "number").toBeTruthy()
    console.log(calculator["calculateWithString"](operation))
  }
})