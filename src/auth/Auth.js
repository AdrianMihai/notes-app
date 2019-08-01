import React from 'react';

const authContext = React.createContext({});

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);

        //this.authContext = ;

        this.state = {
            userName: '',
            isAuthenticated: false,
            logIn: (username, callback) => {
                this.setState({
                    userName: username,
                    isAuthenticated: true
                }, callback);
            },
            logOut: () => {
                this.setState({
                    userName: '',
                    isAuthenticated: false
                });
            }
        };
    }

    render() {
        const Context = authContext;

        return (
            <Context.Provider value = {this.state}>
                
                    {
                        this.props.children
                        // (data) => {
                        //     return React.Children.map(this.props.children, (child) => {
                        //         const elem = React.cloneElement(child, {auth: data});
                        //         console.log(elem);
                        //         return elem;
                        //     });
                        // }
                    }
                
            </Context.Provider>
        );
    }
}

export default function withAuth(Component) {
    const Context = authContext;

    return (props) => {
        //console.log(Component);
        return (
            <Context.Consumer>
                {
                    (data) => React.cloneElement(<Component {...props} />, {auth: data})
                }
                
            </Context.Consumer>
        )
    };
}