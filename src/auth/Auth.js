import React from 'react';

import firebaseApp from '../firebase/firebase';

const authContext = React.createContext({});

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);

        this.firebaseApp = firebaseApp;

        this.state = {
            userId: '',
            userName: '',
            isAuthenticated: false
        };
    }

    logIn = (username, callback = () => {}) => {
        localStorage.setItem('username', username);

        this.setState({
            userName: username,
            isAuthenticated: true
        }, callback);
    }

    logOut = () => {

        localStorage.removeItem('username');

        this.setState({
            userName: '',
            isAuthenticated: false
        });
    }

    getProvidedValue = () => {
        return {
            logIn: this.logIn,
            logOut: this.logOut,
            isAuthenticated: this.state.isAuthenticated,
            userName: this.state.userName
        };
    }

    componentWillMount() {
        if (typeof(Storage) !== "undefined") {
            let username = localStorage.getItem('username');
            
            if (username) {
                console.log(typeof username);
                this.logIn(username);
            }
        }
    }

    render() {
        const Context = authContext;

        return (
            <Context.Provider value = {this.getProvidedValue()}>
                
                    {this.props.children}
                
            </Context.Provider>
        );
    }
}

export default function withAuth(Component) {
    const Context = authContext;

    return (props) => {
        
        return (
            <Context.Consumer>
                {
                    (data) => React.cloneElement(<Component {...props} />, {auth: data})
                }
                
            </Context.Consumer>
        )
    };
}