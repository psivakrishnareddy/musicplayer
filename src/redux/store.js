import { createStore, combineReducers } from "redux";
import LoginReducer from "./login/loginReducer";
import favReducer from "./favourites/favReducer";
import musicReducer from "./musiccontent/musicReducer";

const rootReducer = combineReducers({
  Login: LoginReducer,
  favs: favReducer,
  music: musicReducer
});
const store = createStore(rootReducer);
export default store;
