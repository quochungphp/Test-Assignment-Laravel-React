import * as actionTypes from '../constants/actionTypes';
import { updateObject } from '../../services/utils';

const initialState = {
    organisations: [],
    organisation: [],
    errors: [],
    action: "",
    loading: false
};
// First loading
const fetchOrganisationsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

// Update organisations into organisations state
const fetchOrganisationsSuccess = (state, action) => {
     return updateObject(state, {
        organisations: action.organisations,
        errors: [],
        action: "index",
        loading: false
    });
};

const fetchSingleOrganisation = (state, action) => {
    return updateObject(state, {
        organisation: action.organisation,
        loading: false,
        errors : []
    });
};

const updateAction = (state, action) => {
    console.log("state, action", action)
    return updateObject(state, {
        action: action.action,
        organisation: [],
        loading: false,
        errors: []
    });
};

// const fetchOrganisationsFail = (state, action) => {
//     return updateObject(state, { loading: false });
// };

const hasError = (state, action) => {
    return updateObject(state, {
        errors : action.errors,
        loading: false
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORGANISATIONS_START:       return fetchOrganisationsStart(state, action);
        case actionTypes.ORGANISATIONS_SUCCESS:     return fetchOrganisationsSuccess(state, action);
        case actionTypes.ORGANISATION_ACTION:       return updateAction(state, action);
        case actionTypes.ORGANISATION_READ:         return fetchSingleOrganisation(state, action);
        case actionTypes.ORGANISATION_ERROR:        return hasError(state, action);
        // case actionTypes.USER_FAIL:         return fetchOrganisationsFail(state, action);
        default: return state;
    }
};

export default reducer;
