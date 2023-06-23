import { render, screen, fireEvent } from '@testing-library/react';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Logout', () => {
  let getByText;

  beforeEach(() => {
    const result = render(<Logout />);
    getByText = result.getByText;
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('When log out button is clicked', () => {
    it('should remove token from local storage', () => {
      localStorage.setItem('token', 'testToken');
      fireEvent.click(getByText('Log out'));
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should navigate to login page', () => {
      fireEvent.click(getByText('Log out'));
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should not throw an error if there is no token in the local storage', () => {
      expect(() => {
        fireEvent.click(getByText('Log out'));
      }).not.toThrow();
    });
  });
});
