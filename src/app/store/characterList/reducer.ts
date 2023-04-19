import { Reducer } from "redux";

import { CharactersActionTypes, CharacterListState, CharactersAction } from "./types";
export const initialState: CharacterListState = {
	data: [],
  errors: undefined,
  loading: false,
	searchedName: '',
	page: 1,
	total: 1,
};

const reducer: Reducer<CharacterListState> = (state = initialState, action: CharactersAction): CharacterListState => {
  switch (action.type) {
    case CharactersActionTypes.FETCH_CHARACTERS_REQUEST: {
      return { ...state, loading: true };
		}
		case CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST: {
      return { ...state, loading: true };
		}
    case CharactersActionTypes.FETCH_CHARACTERS_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CharactersActionTypes.FETCH_CHARACTERS_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case CharactersActionTypes.SET_SEARCHED_NAME: {
        return { ...state, searchedName: action.payload, total: 1, page: 1 }
		}
		case CharactersActionTypes.SET_PAGE: {
			return { ...state, page: action.payload }
		}
		case CharactersActionTypes.SET_TOTAL: {
			return { ...state, total: action.payload }
		}
    default: {
      return state;
    }
  }
};

export const setPageAction = (payload: number) => ({
	type: CharactersActionTypes.SET_PAGE,
	payload,
})

export const setSearchNameAction = (payload: string) => ({
	type: CharactersActionTypes.SET_SEARCHED_NAME,
	payload,
})

export const getSearchedCharactersAction = (payload: any[]) => ({
	type: CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST,
	payload,
})

export { reducer as characterListReducer };