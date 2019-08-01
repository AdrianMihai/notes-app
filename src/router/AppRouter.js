import React from 'react';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Home } from '../Home';
import { Notes } from '../notes/Notes';
import { PrivateRoute } from './PrivateRoute';
import withAuth from '../auth/Auth';

class AppRouterComp extends React.Component {

    render() {
        return (
            <Router>
                <Route exact path="/"
                    render = {
                        () => 
                            this.props.auth.isAuthenticated === true ? <Redirect to="/notes"/> : <Home />
                    }
                />
                <PrivateRoute exact path = "/notes" component = {Notes} />
            </Router>
        );
    }
}

export let AppRouter = withAuth(AppRouterComp);