import React from 'react';

import firebaseApp from '../firebase/firebase';

const notesContext = React.createContext({});

export class NotesProvider extends React.Component {
    constructor(props) {
        super(props);

        this.firebaseApp = firebaseApp;

        this.state = {
            notes: [],
            isLoading: false
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
    

    getDatabase() {
        return this.firebaseApp.database();
    }

    isLoading = () => {
        return this.state.isLoading;
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

    async loadNotes() {
        
        this.setState({
            isLoading: true
        }, async () => {
            let notes = [];

            await this.getDatabase().ref('/notes').once('value')
            .then((snapshot) => {
                console.log(snapshot);
                snapshot.forEach((childSnapshot) => {
                    
                    let key = childSnapshot.key,
                        noteData = childSnapshot.val();
                    
                    notes.push(this.createNote(key, noteData.title, noteData.content));
                });
            });

            this.setState({
                notes: notes,
                isLoading: false
            });
        });
        

        
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

    async addNote(title, content) {
        
        this.setState({
            isLoading: true
        }, async () => {
            let dbRef = this.getDatabase().ref('/notes');
            let key = dbRef.push().key;
            
            await dbRef.child(key).set({title, content});

            let notes = this.state.notes;
            notes.push(this.createNote(key, title, content));

            this.setState({
                notes: notes,
                isLoading: false
            });
                
        });
        
        
    }

    async updateNote(id, title, content) {
        this.setState({
            isLoading: true
        }, async () => {
            let index = this.findNoteIndex(id);

            if (index > -1) {
                let noteRef = this.getDatabase().ref(`/notes/${id}`);

                await noteRef.set({title, content});
                let notes = this.state.notes;

                let note = notes[index];
                note.title = title;
                note.content = content;

                notes[index] = note;
                
                this.setState({
                    notes: notes,
                    isLoading: false
                });
            }
        });
        
    }

    async deleteNote(id) {

        this.setState({
            isLoading: true
        }, async () => {
            let index = this.findNoteIndex(id);

            if (index > -1) {
                let noteRef = this.getDatabase().ref(`/notes/${id}`);
                await noteRef.remove();

                let notes = this.state.notes;
                notes.splice(index, 1);

                this.setState({
                    notes: notes,
                    isLoading: false
                });
                
            }
        });
        
    }

    getProvidedValue = () => {
        return {
            isLoading: this.isLoading,
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

    componentDidMount() {
        this.loadNotes();
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