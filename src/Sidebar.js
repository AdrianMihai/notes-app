import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { IconButton, Icon, Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import withAuth from './auth/Auth';
import withNotes from './notes/NotesProvider';
import { withTheme } from '@material-ui/styles';

class SidebarComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    open = () => {
        this.setState({isOpen: true});
    }

    close = () => {
        this.setState({isOpen: false});
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <React.Fragment>
                <IconButton
                    className = "sidebar-toggler"
                    onClick = {this.open}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <SwipeableDrawer
                    open = {this.state.isOpen}
                    onClose = {this.close}
                    onOpen = {this.open}
                >   
                    <div 
                        className = "sidebar-content"
                        style = {{
                            padding: '1em 3em'
                        }}
                    >
                        <Typography
                            variant = "h5"
                            paragraph
                        >
                            {`Hello, ${this.props.auth.userName}!`}
                        </Typography>

                        <List>
                            <ListItem 
                                button
                                onClick = {(e) => this.props.auth.logOut()}
                            >
                                <ListItemIcon>
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText primary = "Log out" />
                            </ListItem>
                            
                        </List>
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        );
    }
}

export let Sidebar = withTheme(withNotes(withAuth(SidebarComp)));