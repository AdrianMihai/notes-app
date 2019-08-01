import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';

import withAuth from '../auth/Auth';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';

class NotesComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            openEditor: null,
            selectedNoteId: null
        };

        this.addNote = this.addNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.getEditorOpener = this.getEditorOpener.bind(this);
        this.saveNoteChange = this.saveNoteChange.bind(this);
        this.selectNote = this.selectNote.bind(this);
        //this.generateUniqueId = this.generateUniqueId.bind(this);
    }

    generateRandomId() {
        return Math.floor(Math.random() * Math.floor(1000));;
    }

    generateUniqueId = () => {
        let id = this.generateRandomId();

        while (this.state.notes.filter(n => n.id === id).length > 0) {
            id = this.generateRandomId();
        }

        return id;
    }

    createNote(id, title, content) {
        return {id, title, content};
    }

    findNoteIndex = (id) => {
        return this.state.notes.findIndex(n => n.id === id)
    }

    addNote(title, content) {
        
        let id = this.generateUniqueId();
        let notes = this.state.notes;
        notes.push(this.createNote(id, title, content));

        this.setState({notes});
    }

    updateNote(id, title, content) {
        let index = this.findNoteIndex(id);

        if (index > -1) {
            let notes = this.state.notes;

            let note = notes[index];
            note.title = title;
            note.content = content;

            notes[index] = note;
            
            this.setState({notes});
        }
    }

    deleteNote(id) {
        console.log(this.state);
        let index = this.findNoteIndex(id);

        if (index > -1) {
            let notes = this.state.notes;
            notes.splice(index, 1);

            this.setState({notes});
        }
    }

    selectNote(id) {
        this.setState({
            selectedNoteId: id
        });

        let note = this.state.notes[this.findNoteIndex(id)];
        this.state.openEditor(true, note.title, note.content);
    }

    saveNoteChange(title, content) {
        if (this.state.selectedNoteId === null) {
            this.addNote(title, content);
        }
        else {
            this.updateNote(this.state.selectedNoteId, title, content);
            this.setState({
                selectedNoteId: null
            });
        }
    }
    
    createDummyNotes = () => {
        let notes = [];

        this.addNote('Title1', 'Content1');
        this.addNote('Title2', 'Content2');
        //this.addNote('Title3', 'Content3');
    }

    getEditorOpener(opener) {
        this.setState({
            openEditor: opener
        });
    }

    
    componentDidMount() {
        this.createDummyNotes();

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
                                notes = {this.state.notes}
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

export let Notes = withAuth(NotesComp);