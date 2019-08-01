import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import withAuth from './auth/Auth';

import './Home.css';
import { withTheme } from '@material-ui/styles';

class HomeComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    isUsernameValid() {
        return this.state.name.length > 2 && this.state.name.length < 16;
    }
    
    formSubmitHandler(event) {
        console.log('form submitted');
        
        if (this.isUsernameValid()) {
            this.props.auth.logIn(
                this.state.name,
                () => console.log(this.props)
            );
            
        }
        
        event.preventDefault();
    }

    render() {
        return (
            <Grid
                container
                className = "main-container"
                justify = "center"
            >
                <Grid
                    className = "form-container"
                    item
                    xs = {12}
                    sm = {10}
                    md = {8}
                    lg = {4}
                >
                    <Typography
                        variant = "h4"
                        align = "center"
                        paragraph = {true}
                    >
                        Enter your name to access your notes
                    </Typography>
                    <form 
                        id = "login-form"
                        onSubmit = {this.formSubmitHandler}
                    >
                        <TextField
                            fullWidth
                            error = {!this.isUsernameValid()}
                            FormHelperTextProps = {
                                {
                                    style: {
                                        display: this.isUsernameValid() === true ? 'none' : 'block'
                                    } 
                                }
                            }
                            helperText = "The username should have between 3 and 15 characters"
                            id = "username"
                            label = "Name"
                            value = {this.state.name}
                            onChange = {this.handleNameChange}
                            margin = "normal"
                            variant = "outlined"
                        />
                        <div className = "login-button-container">
                            <Button
                                size = "large"
                                color = "secondary"
                                variant = "contained"
                                disabled = {!this.isUsernameValid()}
                                onClick = {this.formSubmitHandler}
                            >
                                Log in
                            </Button>
                        </div>
                        
                    </form>
                </Grid>
            </Grid>
        );
    }

    componentDidUpdate() {
        //console.log(this.props);
    }
}

export let Home = withTheme(withAuth(HomeComp));