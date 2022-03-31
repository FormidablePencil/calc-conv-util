import React, { useState } from 'react';
import Converter from './Converter';
import { Operation } from './Calculator';

export type IRawData = (string)[][] // e.g. [["key1", "value1"], ["key2", "value2"]]
export type IConvertedData = (string | number)[][] // e.g. [['num1', 3], ['num2', 4]]

function ConverterUI() {
  const [rawData, setRawData] = useState<IRawData>()
  const [convertedData, setConvertedData] = useState<IConvertedData>()
  const converter = new Converter(setRawData, setConvertedData, convertedData);
  const [operation, setOperation] = useState<Operation>(Operation.Addition)
  const [errMsg, setErrMsg] = useState<string>() // todo - handle num invalid

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

  const Calculator = ({ firstNum, secondNum }: { firstNum: number, secondNum: number }) =>
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
          firstNum={convertedData[1][1] as number}
          secondNum={convertedData[0][1] as number} />
      }
    </div>
  )
}

export enum ExceptionCode { InvalidInput = "Invalid input" }

const App = () =>
  <div className="">
    <ConverterUI />
  </div>

export default App;
