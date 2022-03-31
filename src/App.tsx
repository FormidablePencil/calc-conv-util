import React, { useState } from 'react';
import Converter from './Converter';
import Calculator, { Operation } from './Calculator';

export type IRawData = (string)[][] // e.g. [["key1", "value1"], ["key2", "value2"]]
export type IConvertedData = (string | number)[][] // e.g. [['num1', 3], ['num2', 4]]

export class CalcState {
  convertedData: IConvertedData
  operation: Operation
  constructor(convertedData: IConvertedData, operation: Operation) {
    this.convertedData = convertedData
    this.operation = operation
  }
}

export class Test123 extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      convertedData: [['num1', 3], ['num2', 4]],
      operation: Operation.Subtraction
    }
  }
}

function ConverterUI() {
  const [errMsg, setErrMsg] = useState<string>() // todo - handle num invalid

  const [rawData, setRawData] = useState<IRawData>()
  const [convertedData, setConvertedData] = useState<IConvertedData>()
  const converter = new Converter(setRawData, setConvertedData, convertedData);

  const [operation, setOperation] = useState<Operation>(Operation.Addition)

  const calculator = new Calculator(() => rawData, () => convertedData, () => operation)


  // ============= compositions ======================
  const RESToperations = () =>
    <div>
      <button
        onClick={converter.requestData}>Get data</button> {/* Show the response and converted result */}
      <button
        onClick={() => converter.postCalculatedResult(operation)}>Post calculated result</button> {/* Signify that post was made onclick */}
    </div>

  const RequestResponse = ({ data }: { data: IConvertedData | IRawData }) =>
    <div>
      {data.map((item) =>
        <div>
          <p>Key: {item[0]}</p>
          <p>Value: {item[1]}</p>
        </div>
      )}
    </div>

  const CalcOperationSelector = () =>
    <div>
      {Calculator.operationSymbols.map((symbol) =>
        <div>
          {symbol}
        </div>
      )}
    </div>

  const CalculatorUI = () =>
    <div>
      <span>{calculator.firstValue}</span>
      <span>{Object.values(operation)}</span>
      <span>{calculator.secondValue}</span>
      <span>{calculator.enumToSymbol()}</span>
      <span>{'='}</span>
      <span>{calculator.calculate}</span>
    </div>
  // ============= compositions ======================


  return (
    <div>
      <RESToperations />

      <CalcOperationSelector />

      {rawData && convertedData &&
        <>
          <RequestResponse data={rawData} />
          <RequestResponse data={convertedData} />
        </>
      }

      <CalculatorUI />
    </div>
  )
}

export enum ExceptionCode { InvalidInput = "Invalid input" }

const App = () =>
  <div className="">
    <ConverterUI />
  </div>

export default App;
