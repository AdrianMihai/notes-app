import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class NoteEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            currentTitle: '',
            currentContent: '',
            editMode: true
        };

        this.open = this.open.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.saveNote = this.saveNote.bind(this);
    }

    open(editMode, title = '', content = '') {
        this.setState({
            isOpen: true,
            currentTitle: title,
            currentContent: content
        });
    }

    handleClose() {
        this.setState({
            isOpen: false,
            currentTitle: '',
            currentContent: ''
        });
    }

    handleTitleChange(event) {
        this.setState({
            currentTitle: event.target.value
        });
    }

    handleContentChange(event) {
        this.setState({
            currentContent: event.target.value
        });
    }

    saveNote() {
        if (this.state.currentTitle.length > 0 && this.state.currentContent.length > 0) {
            this.props.saveNoteChange(this.state.currentTitle, this.state.currentContent);
            this.handleClose();
        }
    }

    componentDidMount() {
        this.props.shareOpener(this.open);
    }

    render() {
        return (

            <Dialog
                keepMounted
                className = 'note-editor'
                open = {this.state.isOpen}
                TransitionComponent={Transition}
                onClose = {this.handleClose}
                maxWidth = 'md'
            >
                <DialogTitle
                    style = {{
                        minWidth: '500px'
                    }}
                >
                    {
                        this.state.editMode === false
                        ? this.state.currentTitle
                        : <TextField 
                            fullWidth
                            placeholder = "Title of the note"
                            value = {this.state.currentTitle}
                            onChange = {this.handleTitleChange}
                        />
                    }
                </DialogTitle>
                <DialogContent dividers >

                    {
                        this.state.editMode === false
                        ? <DialogContentText>{this.state.currentTitle}</DialogContentText>
                        : <TextField
                            className = "note-content"
                            fullWidth
                            multiline
                            rows = {5}
                            rowsMax = {30}
                            variant = "outlined"
                            label = "Content"
                            placeholder = "Content of the note"
                            value = {this.state.currentContent}
                            onChange = {this.handleContentChange}
                        />
                    }
                    
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick = {this.saveNote} 
                        color="primary"
                        variant = 'contained'
                    >
                        Save Changes
                    </Button>
                    <Button 
                        onClick = {this.handleClose}
                        color = "secondary"
                        variant = 'contained'
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}