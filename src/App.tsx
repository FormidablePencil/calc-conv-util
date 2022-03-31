import React, { useState } from 'react';
import Converter from './Converter';
import Calculator, { Operation } from './Calculator';
import { BoxContainer, GenericBtn, OperationBtn } from './StyledElements';
import { NotificationContainer } from 'react-notifications';
import ReactLoading from 'react-loading';
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
  // const [errMsg, setErrMsg] = useState<string>()
  const [rawData, setRawData] = useState<IRawData>()
  const [convertedData, setConvertedData] = useState<IConvertedData>()
  const [operation, setOperation] = useState(Operation.Addition)
  const [loading, setLoading] = useState(false)
  const converter = new Converter(
    (newState) => setRawData(newState),
    () => rawData,
    (newState) => setConvertedData(newState),
    () => convertedData,
    () => operation,
    (newState) => setLoading(newState)
  );

  const calculator = new Calculator(() => rawData, () => convertedData, () => operation)


  // ============= compositions ======================
  const RESToperations = () =>
    <div className="flex">
      <GenericBtn
        onClick={converter.requestData}>Get</GenericBtn> {/* Show the response and converted result */}
      <GenericBtn
        inverted
        onClick={converter.postCalculatedResult}>Post</GenericBtn> {/* Signify that post was made onclick */}
    </div>

  const RequestResponse = ({ data, title }: { data: IConvertedData | IRawData, title: string }) =>
    <div className="flex-1 p-1">
      <h2 className="text-1xl pb-2 text-gray-500" style={{ color: "#4E6381" }}>{title}</h2>
      {data.map((item, idx) =>
        <div key={idx} className="text-sm">
          <p>Key: {item[0]}</p>
          <p>Value: {item[1]}</p>
        </div>
      )}
    </div>

  const CalcOperationSelector = () =>
    <div className="flex font-funky">
      {Calculator.operationSymbols.map((symbol, idx) =>
        <OperationBtn key={idx} onClick={() => setOperation(symbol[0] as Operation)}>
          {symbol[1]}
        </OperationBtn>
      )}
    </div>

  const CalculatorUI = () =>
    <div className="flex justify-around text-4xl font-funky">
      <span>{calculator.firstValue ?? "__"}</span>
      <span>{calculator.operationEnumToSymbol()}</span>
      <span>{calculator.secondValue ?? "__"}</span>
      <span>{'='}</span>
      <span>{calculator.firstValue ? calculator.calculateRounded() : "__"}</span>
    </div>

  // ============= compositions ======================


  return (
    <div className="flex justify-center items-center">
      {loading &&
        <ReactLoading className='absolute' type="cylon" color="#87ABDF" height={100} width={100} />
      }
      <BoxContainer>
        <>
          <RESToperations />

          <CalcOperationSelector />

          <div className={`m-2 flex flex-1 basic-transition-${rawData && convertedData ? "in" : "out"}`}>
            {rawData && convertedData &&
              <div className="flex flex-1">
                <RequestResponse data={rawData} title="Raw data" />
                <RequestResponse data={convertedData} title="Converted data" />
              </div>
            }
          </div>

          <CalculatorUI />
        </>
      </BoxContainer >
    </div>
  )
}

export enum ExceptionCode { InvalidInput = "Invalid input" }

const App = () =>
  <div className="flex h-screen justify-center items-center bg-slate-700">
    <ConverterUI />
    <NotificationContainer />
  </div>

export default App;
