import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import wordsToNumbers from 'words-to-numbers';
import { ExceptionCode, IConvertedData, IRawData } from './App';
import { Operation } from "./Calculator";

/**
 * Fetches data on initialization
 * 
 * May throw an exception if the data if a word provided is invalid @property {wordToNum}
 */
export default class Converter {
  setRawData;
  setConvertedData;
  convertedData;

  constructor(
    setRawData: Dispatch<SetStateAction<IRawData | undefined>>,
    setConvertedData: Dispatch<SetStateAction<IConvertedData | undefined>>,
    convertedData: IConvertedData | undefined
  ) {
    this.setRawData = setRawData
    this.setConvertedData = setConvertedData
    this.convertedData = convertedData
  }

  async requestData() {
    this.setRawData(await this.getRawData())
    this.setConvertedData(await this.getConvertedData())
  }

  async postCalculatedResult(operation: Operation) {
    // todo - need calculated result
    // axios.post("https://100insure.com/mi/api2.php", this.convertedData)
  }

  private async getRawData(): Promise<[string, string][]> {
    const data = await (await axios.get("https://100insure.com/mi/api1.php")).data
    return Object.entries(data)
  }

  private convertKey(key: string) {
    return `num${parseInt(key.charAt(key.length - 1))}`
  }

  private wordToNum(word: string): number | never {
    const res = wordsToNumbers(word)
    if (typeof res === "string" || res === null)
      throw new Error(ExceptionCode.InvalidInput)
    else return res
  }

  private async getConvertedData() {
    const data = await this.getRawData()

    const convertedData = data.map(item => {
      const keyValuePair = [
        this.convertKey(item[0]),
        this.wordToNum(item[1])
      ]
      return keyValuePair
    })

    return convertedData
  }
}