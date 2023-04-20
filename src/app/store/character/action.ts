import { CharacterAction, CharacterActionTypes, ICharacter } from "./types";

import { Dispatch } from "redux";

const url = "https://swapi.dev/api/people";

export const fetchCharacterRequest = (id: string) => {
  return async (dispatch: Dispatch<CharacterAction>) => {
    try {
      dispatch({
        type: CharacterActionTypes.FETCH_CHARACTER_REQUEST,
			});
			const dataFetch = async () => {
				const dataFromFetch = await (await fetch(`${url}/${id}`)).json();
				
				dispatch({
					type: CharacterActionTypes.FETCH_CHARACTER_SUCCESS,
					payload: dataFromFetch
				});
			}
			dataFetch();
    } catch (e) {
      dispatch({
				type: CharacterActionTypes.FETCH_CHARACTER_ERROR,
				payload: 'Что-то пошло не так ...'
      });
    }
  };
};

export const updateCharacter = (data: ICharacter) => {
  return async (dispatch: Dispatch<CharacterAction>) => {
     dispatch({
        type: CharacterActionTypes.UPDATE_CHARACTER,
        payload: data
      });
		}
	}
