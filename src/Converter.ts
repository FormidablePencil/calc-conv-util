import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import wordsToNumbers from 'words-to-numbers';

import { ExceptionCode, IConvertedData, IRawData } from './App';
import { Operation } from './Calculator';

/**
 * Fetches data on initialization
 * 
 * May throw an exception if the data if a word provided is invalid @property {wordToNum}
 */
export default class Converter {
  private setRawData
  private getRawData
  private setConvertedData
  private getConvertedData
  private getOperation
  private setLoading

  constructor(
    setRawData: (newState: IRawData) => void,
    getRawData: () => IRawData | undefined,
    setConvertedData: (newState: IConvertedData) => void,
    convertedData: () => IConvertedData | undefined,
    getOperation: () => Operation,
    setLoading: (newState: boolean) => void,
  ) {
    this.setRawData = setRawData
    this.getRawData = getRawData
    this.setConvertedData = setConvertedData
    this.getConvertedData = convertedData
    this.getOperation = getOperation
    this.setLoading = setLoading
  }

  requestData = async () => {
    this.setLoading(true)
    this.setRawData(await this.fetchRawData())
    this.setConvertedData(await this.convertData())
    this.setLoading(false)
  }

  postCalculatedResult = async () => {
    if (this.getConvertedData() === undefined) {
      NotificationManager.info("Hint: Get data first before posting.", `Nothing to post`);
      return
    }

    let gatheredData = [...this.getConvertedData()!, ["operation", this.getOperation()]]

    const formattedData = Object.fromEntries(gatheredData)
    let notificationMsg = gatheredData?.map(item => ` ${item[0]}: ${item[1]}`)

    NotificationManager.success(`${notificationMsg}`, "Posted formatted data");

    const res = await axios.post("https://100insure.com/mi/api2.php", JSON.stringify(formattedData))

    NotificationManager.success(`Response data: ${res.data}`, 'Request response');
  }

  private async fetchRawData(): Promise<[string, string][]> {
    const { data } = await axios.get("https://100insure.com/mi/api1.php")
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

  private async convertData() {
    const data = this.getRawData() ?? await this.fetchRawData()

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