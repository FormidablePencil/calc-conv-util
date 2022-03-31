import React, { useState } from 'react';
import Converter from './Converter';
import Calculator, { Operation } from './Calculator';
import { BoxContainer, GenericBtn, OperationBtn } from './StyledElements';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
  const [operation, setOperation] = useState<Operation>(Operation.Addition)
  const converter = new Converter(
    (newState) => setRawData(newState),
    () => rawData,
    (newState) => setConvertedData(newState),
    () => convertedData,
    () => operation
  );

  const calculator = new Calculator(() => rawData, () => convertedData, () => operation)


  // ============= compositions ======================
  const RESToperations = () =>
    <div className="flex">
      <GenericBtn
        onClick={converter.requestData}>Get data</GenericBtn> {/* Show the response and converted result */}
      <GenericBtn
        inverted
        onClick={converter.postCalculatedResult}>Post result</GenericBtn> {/* Signify that post was made onclick */}
    </div>

  const RequestResponse = ({ data, title }: { data: IConvertedData | IRawData, title: string }) =>
    <div className="flex-1">
      {title}
      {data.map((item) =>
        <div className="">
          <p>Key: {item[0]}</p>
          <p>Value: {item[1]}</p>
        </div>
      )}
    </div>

  const CalcOperationSelector = () =>
    <div className="flex">
      {Calculator.operationSymbols.map((symbol) =>
        <OperationBtn onClick={() => setOperation(symbol[0] as Operation)}>
          {symbol[1]}
        </OperationBtn>
      )}
    </div>

  const CalculatorUI = () =>
    <div className="bg-orange-400">
      <span>{calculator.firstValue ?? "_"}</span>
      <span>{calculator.operationEnumToSymbol()}</span>
      <span>{calculator.secondValue ?? "_"}</span>
      <span>{'='}</span>
      <span>{calculator.firstValue ? calculator.calculateRounded() : "_"}</span>
    </div>
  // ============= compositions ======================


  return (
    <BoxContainer>
      <>
        <RESToperations />

        <CalcOperationSelector />

        {rawData && convertedData &&
          <div className="flex">
            <RequestResponse data={rawData} title="Raw data" />
            <RequestResponse data={convertedData} title="Converted data" />
          </div>
        }

        <CalculatorUI />
      </>
    </BoxContainer>
  )
}

export enum ExceptionCode { InvalidInput = "Invalid input" }

const App = () =>
  <div className="flex h-screen justify-center items-center bg-slate-200">
    <ConverterUI />

    <NotificationContainer />
  </div>

export default App;
