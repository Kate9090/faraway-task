import { CharactersAction, CharactersActionTypes } from "./types";

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { CharacterListState } from "./types";

const url = "https://swapi.dev/api/people";

// export type AppThunk = ThunkAction<
//   void,
//   CharacterListState,
//   null,
//   Action<string>
// >;

export const fetchCharacterRequest = (page: number) => {
  return async (dispatch: Dispatch<CharactersAction>) => {
    try {
      dispatch({
        type: CharactersActionTypes.FETCH_CHARACTERS_REQUEST,
			});
			const dataFetch = async () => {
				// if (state.searchedName) {
				// 	const dataFromFetch = await (await fetch(`${url}/?&search=${state.searchedName}`)).json();
				// 	dispatch({
				// 		type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
				// 		payload: dataFromFetch.results,
				// 	});
				// 	// dispatch({
				// 	// 	type: CharactersActionTypes.SET_TOTAL,
				// 	// 	payload: dataFromFetch.count
				// 	// });
				// } else {
					const dataFromFetch = await (await fetch(`${url}/?page=${page}`)).json();
					dispatch({
						type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
						payload: dataFromFetch.results
					});
					dispatch({
						type: CharactersActionTypes.SET_TOTAL,
						payload: dataFromFetch.count
					});
					// dispatch({
					// 	type: CharactersActionTypes.SET_TOTAL,
					// 	payload: dataFromFetch.count
					// });
				}
			// }
			dataFetch();
    } catch (e) {
      dispatch({
				type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
				payload: 'Что-то пошло не так ..'
      });
    }
  };
};

export const fetchCharacterSearchRequest = (name: string) => {
  return async (dispatch: Dispatch<CharactersAction>) => {
    try {
      dispatch({
        type: CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST,
			});
			const dataFetch = async () => {
				const dataFromFetch = await (await fetch(`${url}/?&search=${name}`)).json();
				dispatch({
					type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
					payload: dataFromFetch.results
				});
			}
			dataFetch();
    } catch (e) {
      dispatch({
				type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
				payload: 'Что-то пошло не так ..'
      });
    }
  };
};

export const setSearchedName = (name: string) => {
  return async (dispatch: Dispatch<CharactersAction>) => {
    return dispatch({
        type: CharactersActionTypes.SET_SEARCHED_NAME,
        payload: name
      });
		}
	}