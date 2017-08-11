import { UserService } from './../user.service';
import { LoginService } from './../login.service';
import { inject, async, TestBed, fakeAsync, tick } from '@angular/core/testing';

//Working with original Services (takes lot of time to test)

describe('user service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, UserService]
    });
  });

  it('should validate pins', inject([UserService], (service) => {
    service.pin = 12345;
    expect(service.isValidPin()).toBe(false);

    service.pin = 0;
    expect(service.isValidPin()).toBe(true);

    service.pin = 9999;
    expect(service.isValidPin()).toBe(true);

    service.pin = -50;
    expect(service.isValidPin()).toBe(false);
  }));

  it('should warn when pin is wrong', async(inject([UserService], (service) => {
    service.pin = 9999;
    service.getGreeting().then((greeting) => {
      expect(greeting).toEqual('Login failure!');
    });
  })));

  it('should greet when pin is right', async(inject([UserService], (service) => {
    service.pin = 1997;
    service.getGreeting(1997).then((greeting) => {
      expect(greeting).toEqual('Welcome!');
    });
  })));
});

// Creating Mock Service

class MockLoginService extends LoginService {
  login(pin: number) {
    return Promise.resolve(true);
  }
}

// Working with Mock Service (takes no time to execute testcases..)

describe('with mocked login service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: LoginService, useClass: MockLoginService}, UserService]
    });
  });

  it('should greet', async(inject([UserService], (service) => {
    service.getGreeting().then((greeting) => {
      expect(greeting).toEqual('Welcome!');
    });
  })));
});

// Working with Fake async methods using fakeAsync/tick

describe('with fake async', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, UserService]
    });
  });

  it('should greet (with fakeAsync)', fakeAsync(inject([UserService], (service) => {
    var greeting;
    service.getGreeting(1997).then((value) => {
      greeting = value;
    });

    tick(2000);
    expect(greeting).toEqual('Welcome!');
  })));
});