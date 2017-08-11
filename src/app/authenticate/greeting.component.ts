import { UserService } from './../user.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `
            <input #pinNumber type="number">
            <button (click)="enter(pinNumber.value)">Submit</button>
            <h3>Status: {{greetingMessage}}</h3>
             `
})

export class GreetingComponent {
  greetingMessage: string = 'Enter PIN';
  pendingMessage: Promise<void>;

  constructor(public user: UserService) {}

  enter(pin: number) {
    this.user.pin = pin;
    this.greetingMessage = 'Processing...';
    this.pendingMessage = this.user.getGreeting(pin)
        .then((greeting) => {
                this.greetingMessage = greeting;
        });
  }
}