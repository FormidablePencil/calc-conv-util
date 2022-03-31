import { evaluate } from 'mathjs';

import { IConvertedData } from './App';

export enum Operation {
  Division = 'plus',
  Subtraction = 'minus',
  Addition = 'times',
  Multiplication = 'divided by'
}

export default class Calculator {
  data: IConvertedData

  constructor(data: IConvertedData) {
    this.data = data
  }

  enumToSymbol = (operation: Operation) => {
    switch (operation) {
      case Operation.Division:
        return '/'
      case Operation.Subtraction:
        return '-'
      case Operation.Addition:
        return '+'
      case Operation.Multiplication:
        return '*'
    }
  }

  calculate(operation: Operation) {
    return this.calculateWithString(this.enumToSymbol(operation))
  }

  private calculateWithString(operation: string) {
    return evaluate(`${this.data[0][1]} ${operation} ${this.data[1][1]}`)
  }
}


// convert Operation enum to symbol
// calculator operations