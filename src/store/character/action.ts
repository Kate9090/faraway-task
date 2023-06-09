import { CharacterAction, CharacterActionTypes, ICharacter } from "./types";

import { Dispatch } from "redux";
import { API } from "common/API";

export const fetchCharacterRequest = (id: string) => {
  return async (dispatch: Dispatch<CharacterAction>, getState: any) => {
		const state = getState();
		try {
			if (state.character.cacheCharacter![id]) {
				dispatch({
					type: CharacterActionTypes.FETCH_CHARACTER_SUCCESS,
					payload: state.character.cacheCharacter[id]
				});
			} else {
				dispatch({
					type: CharacterActionTypes.FETCH_CHARACTER_REQUEST,
				});
				const dataFetch = async () => {
					const dataFromFetch = await (await fetch(`${API.people}/${id}`)).json();
					
					dispatch({
						type: CharacterActionTypes.FETCH_CHARACTER_SUCCESS,
						payload: dataFromFetch
					});

					dispatch({
						type: CharacterActionTypes.CACHE_CHARACTER_DATA,
						payload: {cacheKey: id, data: dataFromFetch},
					});
				}
				dataFetch();
			}
      
    } catch (e) {
      dispatch({
				type: CharacterActionTypes.FETCH_CHARACTER_ERROR,
				payload: 'Что-то пошло не так ...'
      });
    }
  };
};

export const updateCharacter = (data: ICharacter, id: string) => {
  return async (dispatch: Dispatch<CharacterAction>) => {
     dispatch({
        type: CharacterActionTypes.UPDATE_CHARACTER,
        payload: data
			});
			dispatch({
				type: CharacterActionTypes.CACHE_CHARACTER_DATA,
				payload: {cacheKey: id, data},
			});
		}
	}
