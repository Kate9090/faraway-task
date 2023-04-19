import { combineReducers } from "redux";

import { characterListReducer } from "./reducer";

export const rootReducer = combineReducers({
	characterList: characterListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
