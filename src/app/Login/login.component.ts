import { UserService } from './../user.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    template: `<form method='post'>
                Username: <input type='text' #userName><br>
                Password : <input type='password' #password><br>
                 <button (click)="validate(userName.value,password.value)">Login</button>
                 <h3>Status: {{greetingMessage}}</h3>
                </form>
              `
})
export class LoginComponent {

  greetingMessage: string
  pendingMessage: Promise<void>;

  constructor(public user: UserService) {}

  validate(userName,password) {
    this.greetingMessage = 'Processing...';
    this.pendingMessage = this.user.validateUser(userName,password)
        .then((greeting) => {
                this.greetingMessage = greeting;
        });
  }

}