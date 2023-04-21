import { combineReducers } from "redux";

import { characterListReducer } from "store/characterList/reducer";
import { characterReducer } from "store/character/reducer";

export const rootReducer = combineReducers({
    characterList: characterListReducer,
    character: characterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
