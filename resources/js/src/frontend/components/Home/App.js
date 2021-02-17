import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Footer from './Footer';
import routes from '../../../route/router';

class App extends Component {
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

  export default withRouter( connect( null, null )( App ) );
