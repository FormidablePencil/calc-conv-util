import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import wordsToNumbers from 'words-to-numbers';
import { ExceptionCode, Operation } from './App';

/**
 * Fetches data on initialization
 * 
 * May throw an exception if the data if a word provided is invalid @property {wordToNum}
 */
export class Converter {
  setRawData;
  setFormattedData;
  formattedData;

  constructor(
    setRawData: Dispatch<SetStateAction<[string, string][] | undefined>>,
    setFormattedData: Dispatch<SetStateAction<[string, string][] | undefined>>,
    formattedData: [string, string][] = []
  ) {
    this.setRawData = setRawData
    this.setFormattedData = setFormattedData
    this.formattedData = formattedData
  }

  async requestData() {
    this.setRawData(await this.getRawData())
  }

  async postCalculatedResult(operation: Operation) {
    axios.post("https://100insure.com/mi/api2.php", this.formattedData)
  }

  private async getRawData(): Promise<[string, string][]> {
    const data = await (await axios.get("https://100insure.com/mi/api1.php")).data
    return Object.entries(data)
  }

  private formatKey(key: string) {
    return `num${parseInt(key.charAt(key.length - 1))}`
  }

  private wordToNum(word: string): number | never {
    const res = wordsToNumbers(word)
    if (typeof res === "string" || res === null)
      throw new Error(ExceptionCode.InvalidInput)
    else return res
  }

  private async getFormattedData() {
    const data = await this.getRawData()

    const convertedData = data.map(item => {
      const keyValuePair = [
        this.formatKey(item[0]),
        this.wordToNum(item[1])
      ]
      return keyValuePair
    })

    return convertedData
  }
}