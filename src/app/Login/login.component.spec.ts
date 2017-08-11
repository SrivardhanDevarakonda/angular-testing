import { LoginComponent } from './login.component';
import { UserService } from './../user.service';
import { LoginService } from './../login.service';
import { inject, async, TestBed, fakeAsync, tick ,ComponentFixture} from '@angular/core/testing';

describe('Login functionalities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, UserService]
    });
  });

  it('should warn when user is invalid', async(inject([UserService], (service) => {
    service.validateUser('unknown','unknown').then((greeting) => {
      expect(greeting).toEqual('Invalid User !!');
    });
  })));

  it('should greet when user is valid', async(inject([UserService], (service) => {
    service.validateUser('srivardhan','vardhan').then((greeting) => {
      expect(greeting).toEqual('Valid User !!');
    });
  })));
});


class MockLoginService extends LoginService {
  loginUser(name,pwd) {
    return Promise.resolve(true);
  }
}

// Working with Mock Service (takes no time to execute testcases..)
describe('with mocked login service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{provide: LoginService, useClass: MockLoginService}, UserService]
    });
  });

  // describe('Checking all functionalities', () => {
  //   beforeEach(async(() => {
  //     TestBed.compileComponents();
  //   }));

    it('should greet when user is valid', async(inject([UserService], (service) => {
    service.validateUser('unknown','unknown').then((greeting) => {
      expect(greeting).toEqual('Valid User !!');
    });
  })));

  // use fake async method 
  // it('should accept pin (with fakeAsync)', fakeAsync(() => {
  //     var fixture = TestBed.createComponent(LoginComponent);
  //     var compiled = fixture.debugElement.nativeElement;

  //     compiled.querySelector('button').click();

  //     tick();
  //     fixture.detectChanges();
  //     expect(compiled.querySelector('h3').textContent).toContain('Status: Valid User !!');
  //   }));
//});

});

