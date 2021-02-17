import { combineReducers } from 'redux';
import userReducer from './user';
import organisationReducer from './organisation';


const appReducers = combineReducers({
    userReducer,
    organisationReducer
});

export default appReducers;
