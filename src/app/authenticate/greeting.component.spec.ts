import { UserService } from './../user.service';
import { GreetingComponent } from './greeting.component';
import { LoginService } from './../login.service';
import {
  inject,
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

// Creating mock login service
class MockLoginService extends LoginService {
  login(pin: number) {
    return Promise.resolve(true);
  }
}

describe('greeting component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreetingComponent],
      providers: [{provide: LoginService, useClass: MockLoginService }, UserService ]
    });
  });

  describe('Checking all functionalities', () => {
    beforeEach(async(() => {
      TestBed.compileComponents();
    }));

    it('should ask for PIN', async(() => {
      var fixture = TestBed.createComponent(GreetingComponent);
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('h3').textContent).toContain('Status: Enter PIN');
    }));

    it('should change the greeting', async(() => {
      var fixture = TestBed.createComponent(GreetingComponent);
      fixture.detectChanges();

      // greetingMessage
      fixture.debugElement.componentInstance.greetingMessage = 'Berkadia';

      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h3').textContent).toContain('Status: Berkadia');
    }));

    it('should accept pin', async(() => {
      var fixture = TestBed.createComponent(GreetingComponent);
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;
      compiled.querySelector('button').click();

      // pendingMessage <promise> in greeting.component.ts
      fixture.debugElement.componentInstance.pendingMessage.then(() => {
        fixture.detectChanges();
        expect(compiled.querySelector('h3').textContent).toContain('Status: Welcome!');
      });
    }));

    it('should accept pin (with fakeAsync)', fakeAsync(() => {
      var fixture = TestBed.createComponent(GreetingComponent);

      var compiled = fixture.debugElement.nativeElement;
      compiled.querySelector('button').click();

      // use fake async method
      tick();
      fixture.detectChanges();
      expect(compiled.querySelector('h3').textContent).toContain('Status: Welcome!');
    }));
  });

});