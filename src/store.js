import { createStore, applyMiddleware, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings'
import article from './reducers/article';
import profile from './reducers/profile';
import articleList from './reducers/articleList';
import editor from './reducers/editor';

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  article,
  articleList,
  profile,
  editor
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;
