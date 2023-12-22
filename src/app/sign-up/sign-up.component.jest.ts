import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import { userEvent } from '@testing-library/user-event';

describe('SignUpComponent', () => {
  describe(`Layout`, () => {
    it('has Sign Up header', async () => {
      await render(SignUpComponent);
      const signUp = screen.getByRole('heading', { name: 'Sign Up' });
      expect(signUp).toBeInTheDocument();
    });

    it(`has username input`, async () => {
      await render(SignUpComponent);
      const username = screen.getByLabelText('Username');
      expect(username).toBeInTheDocument();
    });
    it(`has email input`, async () => {
      await render(SignUpComponent);
      const email = screen.getByLabelText('Email');
      expect(email).toBeInTheDocument();
    });
    it(`has password input`, async () => {
      await render(SignUpComponent);
      const password = screen.getByLabelText('Password');
      expect(password).toBeInTheDocument();
    });
    it(`has Sign Up button`, async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it(`has password type for password input`, async () => {
      await render(SignUpComponent);
      const password = screen.getByLabelText('Password');
      expect(password).toHaveAttribute('type', 'password');
    });

    it(`has password type for password repeat input`, async () => {
      await render(SignUpComponent);
      const password = screen.getByLabelText('Password Repeat');
      expect(password).toHaveAttribute('type', 'password');
    });

    it(`has Sign Up button initially disabled`, async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe(`Interactions`, () => {
    it(`enables Sign Up button when password and password repeat are the same`, async () => {
      await render(SignUpComponent);
      const password = screen.getByLabelText('Password');
      const passwordRepeat = screen.getByLabelText('Password Repeat');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
      await userEvent.type(password, 'P4ssword');
      await userEvent.type(passwordRepeat, 'P4ssword');
      expect(button).toBeEnabled();
    });
  });
});
