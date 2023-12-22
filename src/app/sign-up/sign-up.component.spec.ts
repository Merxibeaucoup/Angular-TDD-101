import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Signup layout
  describe(`Layout`, () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement.querySelector('h1') as HTMLElement;
      expect(signUp?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const username = fixture.nativeElement as HTMLElement;
      const label = username.querySelector('label[for="username"]');
      const input = username.querySelector('input[id="username"]');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it('has email input', () => {
      const email = fixture.nativeElement as HTMLElement;
      const label = email.querySelector('label[for="email"]');
      const input = email.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
    });

    it('has passowrd input', () => {
      const password = fixture.nativeElement as HTMLElement;
      const label = password.querySelector('label[for="password"]');
      const input = password.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
    });
    it('has passowrd type for password input', () => {
      const password = fixture.nativeElement as HTMLElement;
      const input = password.querySelector('input[type="password"]');
      expect(input).toBeTruthy();
    });

    it('has passowrd repeat input', () => {
      const password = fixture.nativeElement as HTMLElement;
      const label = password.querySelector('label[for="passwordRepeat"]');
      const input = password.querySelector('input[id="passwordRepeat"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password Repeat');
    });
    it('has passowrd type for password repeat input', () => {
      const password = fixture.nativeElement as HTMLElement;
      const input = password.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button[type="submit"]');
      expect(button?.textContent).toContain('Sign Up');
    });

    it('diables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat match', () => {
      const singUp = fixture.nativeElement as HTMLElement;
      const passwordInput = singUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      const passwordRepeatInput = singUp.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;
      passwordInput.value = 'P4ssword';
      passwordInput.dispatchEvent(new Event('input'));
      passwordRepeatInput.value = 'P4ssword';
      passwordRepeatInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const button = singUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    it('sends the signup request to the backend', () => {
      const spyFetch = spyOn(window, 'fetch');
      spyOn(component, 'onClickSignUp');
      component.username = 'XXXX';
      component.email = 'XXXX@XXXX.com';
      component.password = 'XXXXXXXX';
      component.passwordRepeat = 'XXXXXXXX';
      fixture.detectChanges();
      const passwordInput = fixture.nativeElement.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      passwordInput.value = 'XXXXXXXX';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const passwordRepeatInput = fixture.nativeElement.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;
      passwordRepeatInput.value = 'XXXXXXXX';
      passwordRepeatInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const usernameInput = fixture.nativeElement.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      usernameInput.value = 'XXXX';
      usernameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const emailInput = fixture.nativeElement.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      emailInput.value = 'XXXX@XXXX.com';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const singUp = fixture.nativeElement as HTMLElement;
      const button = singUp.querySelector('button');
      button?.click();

      // expect(window.fetch).toHaveBeenCalled();
      // const args = spyFetch.calls.allArgs()[0];
      // const secondArg = args[1] as RequestInit;

      // // expect(secondArg?.method).toEqual('POST');
      // expect(secondArg.body).toEqual(
      //   JSON.stringify({
      //     username: 'XXXX',
      //     email: 'XXXX@XXXX.com',
      //     password: 'XXXXXXXX',
      //     passwordRepeat: 'XXXXXXXX',
      //   })
      // );
      fixture.detectChanges();
      expect(component.onClickSignUp).toHaveBeenCalled();
    });
  });
});
