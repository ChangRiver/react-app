import { createStore, applyMiddleware, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings'
import article from './reducers/article';

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  article
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;
