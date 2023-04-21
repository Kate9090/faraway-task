import { CharactersAction, CharactersActionTypes } from "./types";

import { Dispatch } from "redux";
import { API } from "common/API";

export const fetchCharacterRequest = (page: number) => {
  return async (dispatch: Dispatch<CharactersAction>, getState: any) => {
		const state = getState();
    try {
			if (state.characterList.cache![page]) {
				dispatch({
					type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
					payload: state.characterList.cache[page].data
				});
				dispatch({
					type: CharactersActionTypes.SET_TOTAL,
					payload: state.characterList.cache[page].total
				});
			} else {
				dispatch({
					type: CharactersActionTypes.FETCH_CHARACTERS_REQUEST,
				});
				const dataFetch = async () => {
					const dataFromFetch = await (await fetch(`${API.people}/?page=${page}`)).json();
					dispatch({
						type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
						payload: dataFromFetch.results
					});
					dispatch({
						type: CharactersActionTypes.SET_TOTAL,
						payload: dataFromFetch.count
					});
					dispatch({
						type: CharactersActionTypes.CACHE_DATA,
						payload: {cacheKey: page, data: {data: dataFromFetch.results, total: dataFromFetch.count}},
					})
				}
				dataFetch().catch(() => {
          dispatch({
            type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
            payload: 'Что-то пошло не так ..'
          });
        });;
			}
    } catch (e) {
      dispatch({
				type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
				payload: 'Что-то пошло не так ..'
      });
    }
  };
};

export const fetchCharacterSearchRequest = (name: string) => {
  return async (dispatch: Dispatch<CharactersAction>, getState: any) => {
		const state = getState();
	
    try {
			if (state.characterList.cache![name]) {
				dispatch({
					type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
					payload: state.characterList.cache[name].data
				});
				dispatch({
					type: CharactersActionTypes.SET_TOTAL,
					payload: state.characterList.cache[name].total
				});
			} else {
				dispatch({
        type: CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST,
			});
			const dataFetch = async () => {
				const dataFromFetch = await (await fetch(`${API.people}/?&search=${name}`)).json();
				dispatch({
					type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
					payload: dataFromFetch.results
				});
				dispatch({
					type: CharactersActionTypes.SET_TOTAL,
					payload: dataFromFetch.count
				});
				dispatch({
					type: CharactersActionTypes.CACHE_DATA,
					payload: {cacheKey: name, data: {data: dataFromFetch.results, total: dataFromFetch.count}},
				})
			}
			dataFetch().catch(() => {
        dispatch({
          type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
          payload: 'Не удалось загрузить данные...'
        });
      });
			}
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
     dispatch({
        type: CharactersActionTypes.SET_SEARCHED_NAME,
        payload: name
      });
		}
	}
