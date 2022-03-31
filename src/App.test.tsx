import { ExceptionCode } from './App';
import { Converter } from './Converter';

describe("Converter", () => {
  const converter = new Converter();

  test("getRawData", async () => {
    const data = await converter.getRawData();
    expect([data[0][0], data[1][0]]).toEqual(["key1", "key2"]);
  })

  test("formatKey, e.g. 'key1' to 'num1'", async () => {
    expect(converter["formatKey"]("key1")).toEqual("num1");
  })

  test("wordToNum - provided valid word", async () => {
    const num = converter["wordToNum"]("three")
    expect(typeof num === "number").toBeTruthy();
  })

  test("wordToNum - provided invalid word", async () => {
    expect(() => converter["wordToNum"]("qwerty")).toThrow(ExceptionCode.InvalidInput);
  })

  test("getFormattedData - e2e", async () => {
    const converter = new Converter();
    const res = await converter.getFormattedData()
    res.forEach((data, idx) => {
      expect(data[0]).toEqual(`num${idx + 1}`);
      expect(typeof data[1] === "number").toBeTruthy();
    })
  })
})