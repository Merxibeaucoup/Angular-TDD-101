import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  onChnagePassword(event: Event) {
    event.preventDefault();
    this.password = (event.target as HTMLInputElement).value;
  }

  onChangeUsername(event: Event) {
    event.preventDefault();
    this.username = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event) {
    event.preventDefault();
    this.email = (event.target as HTMLInputElement).value;
  }

  onChnagePasswordRepeat(event: Event) {
    event.preventDefault();
    this.passwordRepeat = (event.target as HTMLInputElement).value;
  }

  isDisabled() {
    return this.password ? this.password !== this.passwordRepeat : true;
  }

  onClickSignUp() {
    fetch('/api/1.0/users', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
