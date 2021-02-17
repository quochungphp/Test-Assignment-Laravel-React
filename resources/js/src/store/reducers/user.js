import * as actionTypes from '../constants/actionTypes';
import { updateObject } from '../../services/utils';

const initialState = {
    users: [],
    group: [],
    user: [],
    errors: [],
    action: "",
    loading: false
};

const fetchUsersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchUsersSuccess = (state, action) => {
     return updateObject(state, {
        users: action.users,
        group: action.group,
        user: [],
        errors: [],
        action: "",
        loading: false
    });
};

const fetchSingleUser = (state, action) => {
    return updateObject(state, {
        user: action.user,
        loading: false,
        errors : []
    });
};

const updateAction = (state, action) => {
    return updateObject(state, {
        action: action.action,
        loading: false,
        errors: []
    });
};

const fetchUsersFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const hasErrorUser = (state, action) => {
    return updateObject(state, {
        errors : action.errors,
        loading: false
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_START:       return fetchUsersStart(state, action);
        case actionTypes.USERS_SUCCESS:     return fetchUsersSuccess(state, action);
        case actionTypes.USER_ACTION:       return updateAction(state, action);
        case actionTypes.USER_READ:         return fetchSingleUser(state, action);
        case actionTypes.USER_ERROR:        return hasErrorUser(state, action);
        case actionTypes.USER_FAIL:         return fetchUsersFail(state, action);
        default: return state;
    }
};

export default reducer;
