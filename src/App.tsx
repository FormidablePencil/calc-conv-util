import React, { useState } from 'react';
import { Converter } from './Converter';

export enum ExceptionCode { InvalidInput = "Invalid input" }

export enum Operation {
  Division = 'plus',
  Subtraction = 'minus',
  Addition = 'times',
  Multiplication = 'divided by'
}

// convert Operation enum to symbol
// calculator operations

function ConverterUI() {
  const [rawData, setRawData] = useState<[string, string][]>()
  const [convertedData, setConvertedData] = useState<[string, string][]>()
  const converter = new Converter(setRawData, setConvertedData);
  const [operation, setOperation] = useState<Operation>(Operation.Addition)
  const [errMsg, setErrMsg] = useState<string>() // todo - handle num invalid

  // ============= compositions ======================
  const RESToperations = () =>
    <div>
      <button
        onClick={converter.requestData}>Get data</button> {/* Show the response and formatted result */}
      <button
        onClick={() => converter.postCalculatedResult(operation)}>Post calculated result</button> {/* Signify that post was made onclick */}
    </div>

  const RequestResponse = ({ data }: { data: [string, string][] }) =>
    <div>
      {data.map(item =>
        <div>
          <p>Key: {item[0]}</p>
          <p>Value: {item[1]}</p>
        </div>
      )}
    </div>

  const Calculator = ({ firstNum, secondNum }: { firstNum: string, secondNum: string }) =>
    <div>
      <span>{firstNum}</span>
      <span>+</span>
      <span>{secondNum}</span>
      <span>{'='}</span>
      <span>{firstNum + secondNum}</span>
    </div>
  // ============= compositions ======================


  return (
    <div>
      <RESToperations />

      {rawData && convertedData &&
        <>
          <RequestResponse data={rawData} />
          <RequestResponse data={convertedData} />
        </>
      }

      {convertedData &&
        <Calculator
          firstNum={convertedData[1][1]}
          secondNum={convertedData[0][1]} />
      }
    </div>
  )
}

const App = () =>
  <div className="">
    <ConverterUI />
  </div>

export default App;
