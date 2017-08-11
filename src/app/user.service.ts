import { LoginService } from './login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  pin: number;

  constructor(private _loginService: LoginService) { }

  isValidPin() {
    return (this.pin >= 0 && this.pin < 10000);
  }

  getGreeting(pin) {
    return this._loginService.login(pin).then((success) => {
      return success ? 'Welcome!': 'Login failure!'
    });
  }

  validateUser(name,pwd) {
    return this._loginService.loginUser(name,pwd).then((success) => {
      return success ? 'Valid User !!': 'Invalid User !!'
    });
  }
}