import { Reducer } from "redux";
import { ICharacter } from "store/character/types";

import { CharactersActionTypes, CharacterListState, CharactersAction } from "./types";
export const initialState: CharacterListState = {
	data: [],
  error: undefined,
  loading: false,
	searchedName: '',
	page: 1,
	total: 1,
	cache: {},
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
      return { ...state, loading: false, error: action.payload };
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
		case CharactersActionTypes.CACHE_DATA:
      const { cacheKey, data: {data, total} } = action.payload;
      return {
        ...state,
        cache: {
          ...state.cache,
          [cacheKey]: {
						data,
						total,
					}
        }
      };
    default: {
      return state;
    }
  }
};

export const setPageAction = (payload: number) => ({
	type: CharactersActionTypes.SET_PAGE,
	payload,
});

export const setSearchNameAction = (payload: string) => ({
	type: CharactersActionTypes.SET_SEARCHED_NAME,
	payload,
});

export const getSearchedCharactersAction = (payload: ICharacter[]) => ({
	type: CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST,
	payload,
});

export { reducer as characterListReducer };