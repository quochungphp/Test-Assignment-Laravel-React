import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

export const fetchUsersStart = () => {
  return {
    type: actionTypes.USERS_START
  };
};

export const updateStateSingleUser = (user) => {
  return {
    type: actionTypes.USER_READ,
    user: user,
    errors : []
  };
};
export const updateError = (errors) => {
  return {
    type: actionTypes.USER_ERROR,
    errors: errors
  };
};

export const updateAction = (action) => {
  return {
    type: actionTypes.USER_ACTION,
    errors: [],
    action: action
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.USERS_SUCCESS,
    users: users.users,
    group: users.data_select_box
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.USERS_FAIL,
    error: error
  };
};

// Get user list
export const fetchUsers = (query = []) => {
  let params = null
  if (query) {
    params = {
      org_id: query['org_id'],
      name: query['name']
    };
  }
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.get('/api/user/index', { params } )
      .then(res => {
        dispatch(fetchUsersSuccess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};

// Get single info user
export const fetchSingleUser = (id) => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.get(`api/user/get-info/${id}`)
      .then(res => {
        dispatch(updateStateSingleUser(res.data.data));
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};

// Update user info
export const putSingleUser = (id, data) => {
  return dispatch => {
    dispatch(fetchUsersStart())
    axios.put(`api/user/update/${id}`, data)
      .then(res => {
        if (res.data.status === 200) {
          dispatch(updateAction(res.data.action))
          dispatch(fetchUsers());
        } else {
          dispatch(updateError(res.data.errors))
        }
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};

// Create a user
export const postSingleUser = (data) => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.put(`api/user/create`, data)
      .then(res => {
        if (res.data.status === 200) {
          dispatch(updateAction(res.data.action))
          dispatch(fetchUsers());
        } else {
          dispatch(updateError(res.data.errors))
        }
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};

// Delete a user
export const deleteSingleUser = (id) => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.delete(`api/user/delete/${id}`, id)
      .then(res => {
        dispatch(updateAction(res.data.action))
        dispatch(fetchUsers());
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};
