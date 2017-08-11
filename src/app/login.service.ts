import {Injectable} from "@angular/core";

@Injectable()

export class LoginService {
  
  login(pin: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pin == 1997) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  loginUser(name,pwd) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === 'srivardhan' && pwd === 'vardhan') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }
}