import { combineReducers } from "redux";

import records from "./records";
import auth from "./auth";

export default combineReducers({
  records,
  auth,
});

//yada şu şekilde yapıp named import olarak index.js de kullanılır
// export const reducers = combineReducers({ posts });
//src altındaki index js de=> import { reducers } from './reducers';
