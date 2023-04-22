import React from 'react';
import { fireEvent, screen, act, render  } from '@testing-library/react';
import { renderWithProviders } from 'utils/test-utils';
import CharactersList from './CharactersList';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import { useSelector } from 'react-redux';
import useTypedSelector from 'hooks/useTypedSelector';
import {useAppDispatch} from 'hooks/useAppDispatch';
// import { fetchCharacterRequest } from 'store/characterList/action';

// import '../../../jest.setup.js';

// const mockStore = configureStore([]);
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

// const mockDispatch = jest.fn();

// jest.mock('react-redux', () => ({
//   useDispatch: () => mockDispatch,
// }));

// describe('PaginationComponent', () => {
//   it('should call handlePageChange on page change', () => {
//     const { getByTestId } = render(<CharactersList />);
//     const pagination = getByTestId('pagination');

//     act(() => {
//       fireEvent.click(pagination.querySelector('.ant-pagination-item-link') as Element);
//     });

//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: 'SET_PAGE',
//       payload: 2,
//     });
//   });
// });

jest.mock('hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
})); 
// const mockDispatch = jest.fn();

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

  // it('should call handlePageChange on page change', async () => {
  //   const mockDispatch = jest.fn();
  //   const mockGetState = jest.fn();
  //   // const handlePageChange = jest.fn((page) => {
  //   //   mockDispatch({type: 'SET_PAGE', payload: page})
  //   // });

  //   (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  //   const { getByTestId } = renderWithProviders(<CharactersList />);
  //   const pagination = getByTestId('pagination');

  //   // const {getByRole} = renderWithProviders(<CharactersList handlePageChange= {handlePageChange}/>)

  //   await act(async() => {
  //     fireEvent.click(pagination.querySelector('.ant-pagination-item-link') as Element);
  //   });

  //   expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  //   const dispatchedFunction = mockDispatch.mock.calls[0][0];
  //   dispatchedFunction(mockDispatch, mockGetState);

  //   expect(mockDispatch).toHaveBeenCalledTimes(2);

  //   expect(mockDispatch).toHaveBeenNthCalledWith(2, {
  //     type: 'SET_PAGE',
  //     payload: 2,
  //   // }, {
  //     type: 'FETCH_CHARACTERS_ERROR',
  //     payload: "Что-то пошло не так ..",
  //   });

  //   // expect(mockDispatch).toHaveBeenNthCalledWith(2, {
  //     // type: 'FETCH_CHARACTERS_ERROR',
  //     // payload: "Что-то пошло не так ..",
  //   // });
  // });
});
