import { Reducer } from "redux";

import { ICharacter, CharacterActionTypes, CharacterState, CharacterAction } from "./types";
export const initialState: CharacterState = {
	data: {} as ICharacter,
  errors: undefined,
  loading: false,
};

const reducer: Reducer<CharacterState> = (state = initialState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case CharacterActionTypes.FETCH_CHARACTER_REQUEST: {
      return { ...state, loading: true };
		}
    case CharacterActionTypes.FETCH_CHARACTER_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CharacterActionTypes.FETCH_CHARACTER_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case CharacterActionTypes.UPDATE_CHARACTER: {
        return { ...state, data: {...state.data, ...action.payload},  }
		}
    default: {
      return state;
    }
  }
};

export { reducer as characterReducer };