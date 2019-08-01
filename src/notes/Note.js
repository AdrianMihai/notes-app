import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/styles';

const Note = (props) => {
    const theme = useTheme();

    console.log(theme);

    return (
        
        <ListItem className = 'note-list-item'>
            <ButtonBase
                onClick = {(e) =>{ console.log(e); props.selectNote(props.note.id);}}
            >
                <ListItemAvatar>
                    <Avatar
                        style = {{
                            color: 'white',
                            backgroundColor: theme.palette.primary[500]
                        }}
                    >
                        <Icon>notes</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary = {props.note.title}
                    secondary = {props.note.content}
                    secondaryTypographyProps = {{
                        className: 'note-content-preview'
                    }}
                />
            </ButtonBase>
            
            <ListItemSecondaryAction>
                <IconButton 
                    style = {{
                        color: theme.palette.error.dark
                    }}
                    onClick = {(e) => props.deleteNote(props.note.id)}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        
    );
}

export default Note;