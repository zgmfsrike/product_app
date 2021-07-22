import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {productReducer} from './Product/ProductReducer';
import {userReducer} from './๊User/UserReducer';

const rootReducer = combineReducers({productReducer, userReducer});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
