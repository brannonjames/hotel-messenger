import * as moment from 'moment-timezone';
import { greetings } from '../assets/json-export';

enum TimeOfDay {
  morning = 'Morining',
  afternoon = 'Afternoon',
  evening = 'Evening'
}

export interface GreetingParams {
  firstName?: string
  lastName?: string
  company?: string
  roomNumber?: string
  timeOfDay?: TimeOfDay
}

export default class Greeting {

  params: GreetingParams
  message: string

  constructor(stringToRender: string, params: GreetingParams) {
    this.params = params;
    this.message = this.renderTemplateString(stringToRender);
  }

  static getTemplateStrings() {
    return Object.keys(greetings).map(key => {
      return greetings[key];
    });
  }

  static getTimeOfDay(timezone: string) : TimeOfDay {
    const hours = Number(moment().tz(timezone).format('HH'));
    if (hours > 0 && hours < 12) {
      return TimeOfDay.morning
    } else if (hours >= 12 && hours <= 16) {
      return TimeOfDay.afternoon
    } else {
      return TimeOfDay.evening
    }
  }

  public renderTemplateString(stringToRender: String) {
    const rendered = Object.keys(this.params).reduce((acc, val) => {
      const parameter = this.params[val];
      const regExp = new RegExp(`@${val}`, 'gi');
      acc = String(acc.replace(regExp, parameter));
      return acc;
    }, stringToRender);
    return String(rendered);
  }
}