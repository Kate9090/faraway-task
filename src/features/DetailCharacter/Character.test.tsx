import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/test-utils';
import Characters from './DetailCharacter';
import useTypedSelector from 'hooks/useTypedSelector';

jest.mock('hooks/useTypedSelector'); 

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Characters', () => {
  const mockState = {
    data: {},
    loading: false,
    error: 'Что-то пошло не так ..',
  }

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
    (useTypedSelector as jest.Mock).mockImplementation(() => mockState);
  });

  afterEach(() => (useTypedSelector as jest.Mock).mockClear());

  it('should display error message when error is present', () => {
    renderWithProviders(
      <Characters />
    );

    expect(screen.getByText('Что-то пошло не так ..')).toBeInTheDocument();
  });
});

describe('Characters', () => {
  const mockState = {
    searchedName: '',
    data: 
      { name: 'Character 1', url: 'https://swapi.dev/api/people/1/' },
    loading: false,
  }
  
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      })
    });
    (useTypedSelector as jest.Mock).mockImplementation(() => mockState);
  });

  afterEach(() => (useTypedSelector as jest.Mock).mockClear());

  it('renders character data', () => {
    renderWithProviders(
      <Characters />
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
  });
});
