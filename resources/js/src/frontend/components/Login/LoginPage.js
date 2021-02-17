import React, { Component } from 'react';
import {connect} from 'react-redux';

import FormLogin from './FormLogin';
import UserControl from './../../components/Home/UserControl';

class LoginPage extends Component {
	render() {
		return (
  			<div>
			    {this.showArea()}
			</div>
		);
	}

	showArea(){
		if(this.props.isAuthenticated === false) {
			return <FormLogin />;
		}else if (this.props.isAuthenticated === true){
				return <UserControl userInfo={this.props} />;
		}
	}
}

const mapStateToProps = state => {
    return {
				loading: state.auth.loading,
				name: state.auth.name,
				userEmail: state.auth.userEmail,
        error: state.auth.error,
				userId: state.auth.userId,
        isAuthenticated: state.auth.userToken !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}
export default connect(mapStateToProps, null)(LoginPage);
