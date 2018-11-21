export interface Answer {
  guest?: string
  company?: string
  message?: string
  sendMessageConfirmed?: boolean
  sendAnotherMessage?: boolean
}

export default class Prompt {

  type: string
  name: string
  message: string
  choices?: Array<any>
  validate?: (input) => boolean
  transformer?: (input) => string
  when?: (input) => boolean

  constructor(options: Object) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }
}