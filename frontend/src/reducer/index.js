import { combineReducers} from 'redux';
import cartReducer from './CartReducer';
import authReducer from './AuthReducer';

const reducer=combineReducers({
    cart:cartReducer,
    auth:authReducer,
});

export default reducer;