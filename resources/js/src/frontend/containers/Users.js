import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import UsersGrid from '../components/Users/UserGrid';

class Users extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  // Fetch to api to get users
  componentDidMount() {
    this.props.onFetchUsers()
  }


  render() {
    return (
      <div>
        <UsersGrid
          data={this.props.users}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userToken !== null,
    users: state.userReducer.users,
    group: state.userReducer.group,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (query) => dispatch(actions.fetchUsers(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
