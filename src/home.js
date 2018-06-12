import React from "react";
import ReactDOM from "react-dom";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Home extends React.Component {
    render () {
        return(
            <MyEditor />
        );
    }
}

class MyEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  
    onEditorStateChange(editorState) {
      this.setState({
        editorState: editorState,
      });
    };
  
    render() {
      const { editorState } = this.state;
      return (
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange.bind(this)}
        />
      )
    }
  }
  