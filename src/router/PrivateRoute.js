import React from 'react';
import {Route, Redirect,} from "react-router-dom";
import withAuth from '../auth/Auth';

function PrivateRouteComp({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {
                (props) => {
                    let comp = null;

                    if (rest.auth.isAuthenticated === true) {
                        comp = <Component {...props} />;
                    }
                    else {
                        comp = (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: props.location }
                                }}
                            />
                        );
                    }

                    return comp;
                }
                
            }
        />
    );
}

export let PrivateRoute = withAuth(PrivateRouteComp);