import React from 'react';
import { screen  } from '@testing-library/react';
import { renderWithProviders } from 'utils/test-utils';
import CharactersList from './CharactersList';

import useTypedSelector from 'hooks/useTypedSelector';

jest.mock('hooks/useTypedSelector'); 

describe('CharactersList', () => {
  const mockState = {
    searchedName: '',
    data: [],
    loading: false,
    error: 'Что-то пошло не так ..',
    page: 1,
    total: 1,
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
      <CharactersList />
    );

    expect(screen.getByText('Что-то пошло не так ..')).toBeInTheDocument();
  });
});

describe('CharactersList', () => {
  const mockState = {
    searchedName: '',
    data: [
      { name: 'Character 1', url: 'https://swapi.dev/api/people/1/' },
      { name: 'Character 2', url: 'https://swapi.dev/api/people/2/' },
    ],
    loading: false,
    error: 'Что-то пошло не так ..',
    page: 1,
    total: 20,
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

  it('renders characters list', () => {
    renderWithProviders(
      <CharactersList />
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });
});

describe('PaginationComponent', () => {
  const mockState = {
    searchedName: '',
    data: [],
    loading: true,
    page: 1,
    total: 20,
    error: null,
    
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

  it('renders pagination', () => {
    renderWithProviders(
      <CharactersList
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});


