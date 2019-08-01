import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Note from './Note';
import './Note.css';

export default class NotesList extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }
    
    render() {
        return (
            <React.Fragment>
                <Typography
                    className = 'notes-title'
                    variant = 'h4'
                    align = 'center'
                    paragraph = {true}
                >
                    Your Notes
                </Typography>

                <Divider 
                    className = 'title-divider'
                />

                <List>
                    {
                        !this.props.notes || this.props.notes.length === 0
                        ? <Typography
                            className = 'notes-title'
                            variant = 'h6'
                            align = 'center'
                            paragraph = {true}
                        >
                            You currently have no notes
                        </Typography>
                        : this.props.notes.map((n) => {
                            return (
                                <React.Fragment key = {`note-${n.id}`}>
                                    <Note 
                                        note = {n}
                                        deleteNote = {this.props.deleteNote}
                                        selectNote = {this.props.selectNote}
                                    />
                                    <Divider variant="inset" component="li" />
                                </React.Fragment> 
                            );
                        })
                    }
                </List>
            </React.Fragment>
        );
    }
}