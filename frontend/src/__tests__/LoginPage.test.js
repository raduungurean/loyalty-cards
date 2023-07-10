import { fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { renderWithProviders } from './test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { invalidCredentialsText } from '../constants';
import { mockErrorResponse, mockSuccessResponse, mockUserInvalid, mockUserValid, } from './mockData';

describe('Login page tests', () => {
  const handlers = [
    rest.post('/login', async (req, res, ctx) => {
      const { username, password } = await req.json();
      if (username === mockUserInvalid.username) {
        return res(
          ctx.status(mockErrorResponse.status),
          ctx.delay(150),
        );
      } else {
        return res(
          ctx.status(mockSuccessResponse.status),
          ctx.json(mockSuccessResponse.json),
          ctx.delay(150),
        );
      }
    }),
  ];

  const server = setupServer(...handlers);
  let matchMedia;

  beforeAll(() => {
    server.listen();
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('logins when the submit button is clicked with valid data', async () => {
    const { history } = renderWithProviders(<LoginPage />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(usernameInput, { target: { value: mockUserValid.username } });
    fireEvent.change(passwordInput, { target: { value: mockUserValid.password } });

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    return waitFor(() => {
      expect(history.location.pathname).toBe('/dashboard');
    }, { timeout: 1000 });
  });

  test('it has username, password and a submit button', () => {
    renderWithProviders(<LoginPage />);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    expect(submitButton).toBeInTheDocument();
  });

  test('displays an error message when the submit button is clicked with invalid data', async () => {
    renderWithProviders(<><LoginPage /><Toaster /></>);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(usernameInput, { target: { value: mockUserInvalid.username } });
    fireEvent.change(passwordInput, { target: { value: mockUserInvalid.password } });

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    await screen.findByText(invalidCredentialsText);

    expect(screen.getByText(invalidCredentialsText))
      .toBeInTheDocument();
  });

});
