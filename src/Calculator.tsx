import { evaluate } from 'mathjs';

import { IConvertedData, IRawData } from './App';

export enum Operation {
  Division = 'divided by',
  Subtraction = 'minus',
  Addition = 'plus',
  Multiplication = 'times'
}

export default class Calculator {
  static operationSymbols = [
    [Operation.Division, "/"],
    [Operation.Subtraction, "-"],
    [Operation.Addition, "+"],
    [Operation.Multiplication, "*"]
  ]

  private getRawData
  private getConvertedData
  getOperation

  get firstValue() {
    if (this.getConvertedData() === undefined) return undefined
    return this.getConvertedData()![0][1]
  }

  get secondValue() {
    if (this.getConvertedData() === undefined) return undefined
    return this.getConvertedData()![1][1]
  }

  constructor(
    getRawData: () => IRawData | undefined,
    getConvertedData: () => IConvertedData | undefined,
    getOperation: () => Operation,
  ) {
    this.getRawData = getRawData // ? - maybe unnecessary for rawData to be here
    this.getConvertedData = getConvertedData
    this.getOperation = getOperation
  }

  operationEnumToSymbol = () => Calculator.operationSymbols.find(item => item[0] === this.getOperation())![1]

  calculate = () => evaluate(`${this.firstValue} ${this.operationEnumToSymbol()} ${this.secondValue}`)
  calculateRounded = () => parseFloat(this.calculate().toFixed(2))
}