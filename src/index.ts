import * as inquirer from 'inquirer';
import * as shell from 'shelljs';

import { companies, guests } from './assets/json-export';

import CompanyType from './Models/Company';
import GuestType from './Models/Guest';
import Greeting from './Models/Greeting';
import Prompt, { Answer } from './Models/Prompt';

class App {

  currentGuest: GuestType
  currentCompany: CompanyType


  public start() {
    this.resizeTerminal();
    this.runInquirer();
  }

  private getCompanyNames(companies: Array<CompanyType>) : Array<string> {
    return companies.map(c => c.company);
  }

  private findCompany(input: string, companiesToCheck: Array<CompanyType>) : CompanyType {
    return companiesToCheck.find(c => {
      const queryToLower = String(input.toLowerCase());
      if (c.company.toLowerCase() === queryToLower) { return true }
      return false;
    });
  }

  private findGuest(input: string, guestsToCheck: Array<GuestType>) : GuestType {
    return guestsToCheck.find(g => {
      const queryToLower = String(input.toLowerCase());
      if (String(g.id).toLowerCase() === queryToLower) { return true }
      if (g.firstName.toLowerCase() === queryToLower) { return true }
      if (g.lastName.toLowerCase() === queryToLower) { return true }
      return false;
    });
  }

  private nameValidator(input: string, guestsToCheck: Array<GuestType>) : boolean {
    const guest = this.findGuest(input, guestsToCheck);
    if (!guest) {
      console.log('\n Guest Not Found. Try Again.');
      return false;
    }
    return true;
  }

  private runInquirer() {
    const companyNames = this.getCompanyNames(companies);

    const companyPrompt = new Prompt({
      type: 'list',
      name: 'company',
      message: 'What hotel do you work for?',
      choices: companyNames,
      when: (input) => {
        return !this.currentCompany 
      }
    });

    const guestPrompt = new Prompt({
      type: 'input',
      name: 'guest',
      message: 'Enter Guest Name or ID', 
      validate: (input) => {
        return this.nameValidator(input, guests);
      }
    });

    const messagePrompt = new Prompt({
      type: 'list',
      name: 'message',
      message: 'Which message template would you like to use?',
      choices: [...Greeting.getTemplateStrings(), "Create Custom Message"]
    });

    const customMessagePrompt = new Prompt({
      type: 'input',
      name: 'message',
      message: 'Custom Message'
    });

    const confirmSendPrompt = new Prompt({
      type: 'confirm',
      name: 'sendMessageConfirmed',
      message: 'Send Message',
      default: true
    });

    const messageSentPrompt = new Prompt({
      type: 'confirm',
      name: 'sendAnotherMessage',
      message: 'Message Sent! Send Another Message?',
      default: true
    });


    inquirer.prompt([ companyPrompt ])
      .then((answer: Answer) => {
        if (!this.currentCompany) {
          this.currentCompany = this.findCompany(answer.company, companies);
        }
        return inquirer.prompt([ guestPrompt ]);
      })
      .then((answer: Answer) => {
        this.currentGuest = this.findGuest(answer.guest, guests);
        return inquirer.prompt([ messagePrompt ]);
      })
      .then((answer: Answer) => {
        if (answer.message === 'Create Custom Message') {
          console.log(`

          You can plug variables into your message @hotel, @firstName, @lastName, @roomNumber, @timeOfDay

          `);
          return inquirer.prompt([ customMessagePrompt ])
        }
        return answer;
      })
      .then((answer: Answer) => {

        const { message } = new Greeting(answer.message, {
          ...this.currentCompany,
          ...this.currentGuest,
          roomNumber: String(this.currentGuest.reservation.roomNumber),
          timeOfDay: Greeting.getTimeOfDay(this.currentCompany.timezone)
        });

        console.log(`
        
          Here's what your message to ${this.currentGuest.firstName} looks like:


          ${message}

        `);

        return inquirer.prompt([ confirmSendPrompt ])
      })
      .then((answer: Answer) => {
        if (answer && answer.sendMessageConfirmed) {
          return inquirer.prompt([ messageSentPrompt ]);
        }
      })
      .then((answer: Answer) => {
        if (answer && answer.sendAnotherMessage) {
          this.runInquirer();
        }
      })
      .catch(error => {
        console.log(error)
        console.log('An Error has Occured');
      });
  }

  private resizeTerminal() {
    console.clear();
    shell.exec('bash resize.sh');
  }
}

const app = new App();
app.start();
