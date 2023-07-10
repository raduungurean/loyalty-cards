import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App component tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders login form', () => {

    const usernameLabel = screen.getByText('Username');
    const passwordLabel = screen.getByText('Password');
    const signInButton = screen.getByText('Sign In');
    const titleElement = screen.getByText('Fidelity Cards');

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');

    const usernameInput = usernameLabel.nextSibling;
    const passwordInput = passwordLabel.nextSibling;

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.tagName).toBe('INPUT');
    expect(usernameInput.getAttribute('type')).toBe('text');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.tagName).toBe('INPUT');
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  test('renders login form test', () => {
    expect(screen.getAllByTestId('login-page').length).toEqual(1);
  });

  test('renders spinner component after form submission', async () => {
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    await waitFor(() => {
      const submitButtonDiv = document.querySelector('.submitButton');

      const spinner = submitButtonDiv.querySelector('.spinner');
      expect(spinner).toBeInTheDocument();

      expect(spinner).toHaveStyle('width: 12px; height: 12px;');
      expect(spinner).toHaveStyle('border-radius: 100%;');
      expect(spinner).toHaveStyle('border-width: 2px;');
    });
  });

  test('it renders without crashing', () => {
    expect(screen.getByText('Fidelity Cards'))
      .toBeInTheDocument();
  });
});
