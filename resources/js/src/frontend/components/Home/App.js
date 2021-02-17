import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Switch,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import routes from '../../../route/router';
import LoginPage from '../Login/LoginPage';
import * as actions from '../../../store/actions/index';

class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navigation />
                    <div className="container">
                        {this.showRoute(routes)}
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }

    showRoute(routes){
        let xhtml = null;
        // console.log("this.props.isAuthenticated", this.props.isAuthenticated)
        // if (!this.props.isAuthenticated) {
        //     return xhtml = <Switch>
        //                     <Route path="/login" component={LoginPage} />
        //                     <Route path="/" component={HomePage} />
        //                     <Redirect to="/" />
        //                 </Switch>
        // }

        if(routes.length > 0 ){
            xhtml = routes.map((route, index)=> {
                return (
                    <Route key={index} exact={route.exact} path={route.path} component={route.main}/>
                );
            });
        }

        return <Switch>{xhtml}</Switch>;
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.userToken !== null
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
  };

  export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
