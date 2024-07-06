import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

// no data auto clear
// import { legacy_createStore, applyMiddleware } from 'redux';
// import index from './reducer';
// import localforage from 'localforage';
// import { persistStore, persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk';
// const persistConfig = {
//     key: "main-root",
//     storage: localforage
// }
// const Persist = persistReducer(persistConfig, index);
// const store = legacy_createStore(Persist, applyMiddleware(thunk));
// const Persistor = persistStore(store);
// export { Persistor };
// export default store;
