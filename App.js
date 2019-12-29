import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import NavigationContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth-reducer";
import animalsReducer from "./store/reducers/animals-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  animal: animalsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
