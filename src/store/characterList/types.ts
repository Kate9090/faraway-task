import { ICharacter } from "store/character/types";

export enum CharactersActionTypes {
	FETCH_CHARACTERS_REQUEST = "FETCH_CHARACTERS_REQUEST",
	FETCH_CHARACTERS_SEARCH_REQUEST = 'FETCH_CHARACTERS_SEARCH_REQUEST',
  FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS",
	FETCH_CHARACTERS_ERROR = "FETCH_CHARACTERS_ERROR",
	SET_SEARCHED_NAME = "SET_SEARCHED_NAME",
	SET_PAGE = "SET_PAGE",
	SET_TOTAL = "SET_TOTAL",
	CACHE_DATA = "CACHE_DATA",
}

export interface CharacterListState {
	readonly loading: boolean;
	readonly data: ICharacter[];
	readonly error?: string;
	searchedName: string;
	page: number;
	total: number;
	cache: any;
}

interface CacheDataAction {
	type: CharactersActionTypes.CACHE_DATA,
	payload: any;
}

interface FetchCharacterAction {
	type: CharactersActionTypes.FETCH_CHARACTERS_REQUEST,
}

interface FetchCharacterSearchAction {
	type: CharactersActionTypes.FETCH_CHARACTERS_SEARCH_REQUEST,
}

interface FetchCharacterSuccessAction {
	type: CharactersActionTypes.FETCH_CHARACTERS_SUCCESS,
	payload: any[],
}

interface FetchCharacterErrorAction {
	type: CharactersActionTypes.FETCH_CHARACTERS_ERROR,
	payload: string;
}

interface SetSearchedNameAction {
	type: CharactersActionTypes.SET_SEARCHED_NAME,
	payload: string;
}

interface SetPageAction {
	type: CharactersActionTypes.SET_PAGE,
	payload: number;
}

interface SetTotalAction {
	type: CharactersActionTypes.SET_TOTAL,
	payload: number;
}

export type CharactersAction = FetchCharacterAction | FetchCharacterSearchAction | CacheDataAction |
 FetchCharacterSuccessAction | FetchCharacterErrorAction | SetSearchedNameAction | SetPageAction | SetTotalAction;