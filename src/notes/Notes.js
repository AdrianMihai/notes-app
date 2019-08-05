import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import NotificationSnackbar from '../NotificationSnackbar';
import withAuth from '../auth/Auth';
import withNotes from './NotesProvider';
import { Sidebar } from '../Sidebar';

class NotesComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditor: null,
            openSnackbar: null,
            selectedNoteId: null
        };

        this.getEditorOpener = this.getEditorOpener.bind(this);
        this.getSnackbarOpener = this.getSnackbarOpener.bind(this);
        this.saveNoteChange = this.saveNoteChange.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    selectNote(id) {
        this.setState({
            selectedNoteId: id
        });

        let note = this.props.notes.findNote(id);
        this.state.openEditor(false, note.title, note.content);
    }

    async saveNoteChange(title, content) {
        if (this.state.selectedNoteId === null) {
            try {
                await this.props.notes.addNote(title, content);
                this.state.openSnackbar('Note successfully created.', 'success');
            }
            catch(e) {
                this.state.openSnackbar(e.getMessage(), 'error');
            }
        }
        else {
            try {
                await this.props.notes.updateNote(this.state.selectedNoteId, title, content);
                this.state.openSnackbar('Note successfully updated.', 'success');
                this.setState({
                    selectedNoteId: null
                });
            }
            catch(e) {
                this.state.openSnackbar(e.getMessage(), 'error');
            }
        }
    }

    async deleteNote(id) {
        try {
            await this.props.notes.deleteNote(id);
            this.state.openSnackbar('Note successfully deleted.', 'success');
        }
        catch(e) {
            this.state.openSnackbar(e.getMessage(), 'error');
        }
    }

    getEditorOpener(opener) {
        this.setState({
            openEditor: opener
        });
    }

    getSnackbarOpener(opener) {
        this.setState({
            openSnackbar: opener
        });
    }

    getLoader = () => {
        if (this.props.notes.isLoading() === true) {
            return (
                <div className = "loader-container">
                    <CircularProgress
                        className = "circular-progress"
                        variant = 'indeterminate'
                        color = 'primary'
                    />
                </div>
            );
        }
        else {
            return null;
        }
    }
    
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <React.Fragment>

                <Sidebar />
                
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
                                deleteNote = {this.deleteNote}
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

                        { this.getLoader() }
                        
                    </Grid>

                </Grid>

                <NoteEditor 
                    shareOpener = {this.getEditorOpener}
                    saveNoteChange = {this.saveNoteChange}
                />

                <NotificationSnackbar
                    shareOpener = {this.getSnackbarOpener}
                />

            </React.Fragment>
            
        );
    }
};

export let Notes = withNotes(withAuth(NotesComp));