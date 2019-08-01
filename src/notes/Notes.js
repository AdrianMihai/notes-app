import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';

import withAuth from '../auth/Auth';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import withNotes from './NotesProvider';

class NotesComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditor: null,
            selectedNoteId: null
        };

        this.getEditorOpener = this.getEditorOpener.bind(this);
        this.saveNoteChange = this.saveNoteChange.bind(this);
        this.selectNote = this.selectNote.bind(this);
    }

    selectNote(id) {
        this.setState({
            selectedNoteId: id
        });

        let note = this.props.notes.findNote(id);
        this.state.openEditor(false, note.title, note.content);
    }

    saveNoteChange(title, content) {
        if (this.state.selectedNoteId === null) {
            this.props.notes.addNote(title, content);
        }
        else {
            this.props.notes.updateNote(this.state.selectedNoteId, title, content);
            this.setState({
                selectedNoteId: null
            });
        }
    }

    getEditorOpener(opener) {
        this.setState({
            openEditor: opener
        });
    }
    
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <React.Fragment>

                <Grid
                    container
                    className = "main-container"
                    justify = "center"
                >
                    <Grid
                        className = "notes-list"
                        item
                        xs = {12}
                        sm = {10}
                        md = {8}
                        lg = {4}
                        
                    >
                        <Paper>

                            <NotesList 
                                notes = {this.props.notes.findAll()}
                                deleteNote = {this.props.notes.deleteNote}
                                selectNote = {this.selectNote}
                            />
                            <Grid
                                container
                                alignItems = 'flex-end'
                                justify = "flex-end"
                            >
                                <Grid
                                    item
                                    xs = {12}
                                    className = 'add-button-container'
                                >
                                    <IconButton
                                        className = 'add-note-button'
                                        style = {{
                                            backgroundColor: green[500],
                                            color: 'white'
                                        }}
                                        onClick = {this.state.openEditor}
                                    >
                                        <Icon>note_add</Icon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            
                        </Paper>
                    </Grid>
                </Grid>
                <NoteEditor 
                    shareOpener = {this.getEditorOpener}
                    saveNoteChange = {this.saveNoteChange}
                />
            </React.Fragment>
            
        );
    }
}

export let Notes = withNotes(withAuth(NotesComp));