import Calculator, { Operation } from './Calculator';

describe('calculator', () => {
  let convertedData = [['num1', 3], ['num2', 4]];
  let operation = Operation.Subtraction;

  const calculator = new Calculator(() => undefined, () => convertedData, () => operation)

  afterEach(() => {
    convertedData = [['num1', 3], ['num2', 4]];
    operation = Operation.Subtraction;
  })

  test("calculator, pass by reference", async () => {
    expect(calculator.firstValue === convertedData[0][1]).toBe(true);
    expect(calculator.secondValue === convertedData[1][1]).toBe(true);
    expect(calculator.getOperation() === operation).toBe(true);

    convertedData = [['num1', 8], ['num2', 6]];
    operation = Operation.Multiplication;

    expect(calculator.firstValue === convertedData[0][1]).toBe(true);
    expect(calculator.secondValue === convertedData[1][1]).toBe(true);
    expect(calculator.getOperation() === operation).toBe(true);
  })

  test('try to calculate with all operation', async () => {
    for (const value of [Operation.Division, Operation.Subtraction, Operation.Addition, Operation.Multiplication]) {

      operation = value
      expect(typeof calculator.calculateRounded() === "number").toBeTruthy()
    }
  })

  test('enumToSymbol', async () => {
    operation = Operation.Division;
    expect(calculator.operationEnumToSymbol()).toBe('/');

    operation = Operation.Subtraction;
    expect(calculator.operationEnumToSymbol()).toBe('-');
  })
})