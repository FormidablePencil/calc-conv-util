import { evaluate } from "mathjs";

export enum Operation {
  Division = 'plus',
  Subtraction = 'minus',
  Addition = 'times',
  Multiplication = 'divided by'
}

export default class Calculator {
  calculate(operation: Operation) {
    evaluate('1 + 2')
    // math.evaluate('1.2 * (2 + 4.5)')
  }

  enumToSymbol = (operation: Operation) => {
    switch (operation) {
      case Operation.Division:
        break;

      case Operation.Subtraction:
        break;

      case Operation.Addition:
        break;

      case Operation.Multiplication:
        break;
    }
  }
}


// convert Operation enum to symbol
// calculator operations