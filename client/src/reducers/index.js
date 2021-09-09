import { combineReducers } from "redux";

import records from "./records";

export default combineReducers({
  records,
});

//yada şu şekilde yapıp named import olarak index.js de kullanılır
// export const reducers = combineReducers({ posts });
//src altındaki index js de=> import { reducers } from './reducers';
