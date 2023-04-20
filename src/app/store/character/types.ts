export interface ICharacter {
  name: string;
  birth_year: string;
  height: string;
	mass: string;
	url: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export enum CharacterActionTypes {
	FETCH_CHARACTER_REQUEST = "FETCH_CHARACTER_REQUEST",
	FETCH_CHARACTER_SEARCH_REQUEST = 'FETCH_CHARACTER_SEARCH_REQUEST',
  FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS",
	FETCH_CHARACTER_ERROR = "FETCH_CHARACTER_ERROR",
	UPDATE_CHARACTER = "UPDATE_CHARACTER",
}

export interface CharacterState {
	readonly loading: boolean;
	data: ICharacter;
	readonly errors?: string;
}

interface FetchCharacterAction {
	type: CharacterActionTypes.FETCH_CHARACTER_REQUEST,
}

interface FetchCharacterSuccessAction {
	type: CharacterActionTypes.FETCH_CHARACTER_SUCCESS,
	payload: ICharacter,
}

interface FetchCharacterErrorAction {
	type: CharacterActionTypes.FETCH_CHARACTER_ERROR,
	payload: string;
}

interface SetUpdateCharacterAction {
	type: CharacterActionTypes.UPDATE_CHARACTER,
	payload: ICharacter;
}

export type CharacterAction = FetchCharacterAction  |
 FetchCharacterSuccessAction | FetchCharacterErrorAction | SetUpdateCharacterAction;