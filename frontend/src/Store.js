import {createStore,applyMiddleware} from  'redux';
import {thunk} from 'redux-thunk';
// import cartReducer from './reducer/CartReducer';
import reducer from './reducer';

const middleware=[thunk];
const store= createStore(
 reducer,
 applyMiddleware(...middleware)
);

export default store;