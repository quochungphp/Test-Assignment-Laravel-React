import { combineReducers } from 'redux';
import auth from './auth';
import notify from './notify';
import userReducer from './user';
import organisationReducer from './organisation';


const appReducers = combineReducers({
    notify,
    auth,
    userReducer,
    organisationReducer
});

export default appReducers;
