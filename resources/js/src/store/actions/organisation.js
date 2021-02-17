import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

export const fetchOrganisationsStart = () => {
  return {
    type: actionTypes.ORGANISATIONS_START
  };
};

export const updateStateSingleOrganisation = (organisation) => {
  return {
    type: actionTypes.ORGANISATION_READ,
    organisation: organisation,
    errors : []
  };
};
export const updateError = (errors) => {
  return {
    type: actionTypes.ORGANISATION_ERROR,
    errors: errors
  };
};

export const updateAction = (action) => {
  console.log("action", action)
  return {
    type: actionTypes.ORGANISATION_ACTION,
    errors: [],
    organisation: [],
    action: action
  };
};

export const fetchOrganisationsSuccess = (organisations) => {
  return {
    type: actionTypes.ORGANISATIONS_SUCCESS,
    organisations: organisations.organisations
  };
};

export const fetchOrganisationsFail = (error) => {
  return {
    type: actionTypes.ORGANISATIONS_FAIL,
    error: error
  };
};

// Get organisation list
export const fetchOrganisations = () => {
  return dispatch => {
    dispatch(fetchOrganisationsStart());
    axios.get('/api/organisation/index')
      .then(res => {
        dispatch(fetchOrganisationsSuccess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchOrganisationsFail(err));
      });
  };
};

// Get single info organisation
export const fetchSingleOrganisation = (id) => {
  return dispatch => {
    dispatch(fetchOrganisationsStart());
    axios.get(`api/organisation/get-info/${id}`)
      .then(res => {
        dispatch(updateStateSingleOrganisation(res.data.data));
      })
      .catch(err => {
        dispatch(fetchOrganisationsFail(err));
      });
  };
};

// Post organisation info
export const postSingleOrganisation = (id = 0, data) => {
  return dispatch => {
    dispatch(fetchOrganisationsStart())
    let policy = {};
    data.policy.map( item => {
      policy[item.name] = item.value
    });

    let params = {
      id: id,
      name: data.name,
      policy: policy
    }
    console.log(params)
    axios.post(`api/organisation/save/${id}`, params)
      .then(res => {
        if (res.data.status === 200) {
          dispatch(updateAction(res.data.action))
          dispatch(fetchOrganisations());
        } else {
          dispatch(updateError(res.data.errors))
        }
      })
      .catch(err => {
        dispatch(fetchOrganisationsFail(err));
      });
  };
};


// Delete a organisation
export const deleteSingleOrganisation = (id) => {
  return dispatch => {
    dispatch(fetchOrganisationsStart());
    axios.delete(`api/organisation/delete/${id}`, id)
      .then(res => {
        dispatch(updateAction(res.data.action))
        dispatch(fetchOrganisations());
      })
      .catch(err => {
        dispatch(fetchOrganisationsFail(err));
      });
  };
};
