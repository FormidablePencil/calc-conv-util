import { ExceptionCode, IConvertedData, IRawData } from './App';
import Converter from './Converter';

describe("Converter", () => {
  let rawData: IRawData | undefined = undefined;
  let convertedData: IConvertedData | undefined = undefined;
  const setRawDataMock = jest.fn(x => rawData = x);
  const setConvertedDataMock = jest.fn(x => convertedData = x);

  const converter = new Converter(setRawDataMock, setConvertedDataMock, convertedData);

  afterEach(() => {
    convertedData = undefined
    rawData = undefined;
  });

  test("requestData", async () => {
    jest.setTimeout(10000)
    await converter.requestData();
    expect([rawData![0][0], rawData![1][0]]).toEqual(["key1", "key2"]);
  })

  test("convertKey, e.g. 'key1' to 'num1'", async () => {
    expect(converter["convertKey"]("key1")).toEqual("num1");
  })

  test("wordToNum - provided valid word", async () => {
    const num = converter["wordToNum"]("three")
    expect(typeof num === "number").toBeTruthy();
  })

  test("wordToNum - provided invalid word", async () => {
    expect(() => converter["wordToNum"]("qwerty")).toThrow(ExceptionCode.InvalidInput);
  })

  test("requestData - e2e", async () => {
    await converter.requestData()
    convertedData!.forEach((data, idx) => {
      expect(data[0]).toEqual(`num${idx + 1}`);
      expect(typeof data[1] === "number").toBeTruthy();
    })
  })
})