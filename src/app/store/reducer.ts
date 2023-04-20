import { combineReducers } from "redux";

import { characterListReducer } from "app/store/characterList/reducer";
import { characterReducer } from "app/store/character/reducer";

export const rootReducer = combineReducers({
    characterList: characterListReducer,
    character: characterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
