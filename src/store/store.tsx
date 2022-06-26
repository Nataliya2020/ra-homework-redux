import {createStore, combineReducers} from 'redux';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers(
  {
    items: itemsReducer
  }
)

const store = createStore(rootReducer);

export default store;
