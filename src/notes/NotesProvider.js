import React from 'react';

import firebaseApp from '../firebase/firebase';

const notesContext = React.createContext({});

export class NotesProvider extends React.Component {
    constructor(props) {
        super(props);

        this.firebaseApp = firebaseApp;

        console.log(this.firebaseApp.database());

        this.state = {
            notes: []
        };

        this.count = this.count.bind(this);
        this.findAll = this.findAll.bind(this);
        this.getNote = this.getNote.bind(this);
        this.findNote = this.findNote.bind(this);
        this.findNoteIndex = this.findNoteIndex.bind(this);
        this.addNote = this.addNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    count() {
        return this.state.notes.length;
    }

    generateRandomId() {
        return Math.floor(Math.random() * Math.floor(1000));
    }

    generateUniqueId = () => {
        let id = this.generateRandomId();

        while (this.findNoteIndex(id) >= 0) {
            id = this.generateRandomId();
        }

        return id;
    }

    createNote(id, title, content) {
        return {id, title, content};
    }

    findAll() {
        return this.state.notes;
    }

    getNote(index) {
        if (index >= 0 && index < this.count() ) {
            return this.state.notes[index];
        }
    }

    findNoteIndex = (id) => {
        return this.state.notes.findIndex(n => n.id === id)
    }

    findNote(id) {
        return this.getNote(this.findNoteIndex(id));
    }

    addNote(title, content) {
        
        let id = this.generateUniqueId();
        let notes = this.state.notes;
        notes.push(this.createNote(id, title, content));

        this.firebaseApp.database().ref('/notes').push({title, content});
        

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

    getProvidedValue = () => {
        return {
            count: this.count,
            findAll: this.findAll,
            getNote: this.getNote,
            findNote: this.findNote,
            findNoteIndex: this.findNoteIndex,
            addNote: this.addNote,
            updateNote: this.updateNote,
            deleteNote: this.deleteNote
        };
    }

    render() {
        const Context = notesContext;

        return (
            <Context.Provider value = {this.getProvidedValue()}>
                {this.props.children}
            </Context.Provider>
        );
    }

    componentDidUpdate() {
        console.log(this.state);
    }
}

export default function withNotes(Component) {
    const Context = notesContext;

    return (props) => {
        return (
            <Context.Consumer>
                {
                    (data) => React.cloneElement(<Component {...props} />, {notes: data})
                }
            </Context.Consumer>
        );
    };
}