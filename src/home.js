import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from "./home.css";

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }

    onStateChange(editorState) {
      this.setState({
        editorState: editorState,
      });
    
    }

    onSubmit(e) {
      const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
      const html = draftToHtml(rawContentState);
      alert(html);
    }

    render () {
        const buttonEnabled = this.state.editorState.getCurrentContent().hasText();
        return(
            <div>
              <MyEditor onStateChange={this.onStateChange.bind(this)} editorState={this.state.editorState} />
              <button 
                className={styles.submitButton}
                disabled={!buttonEnabled}
                onClick={this.onSubmit.bind(this)}
              >
                Submit
              </button>
            </div>
        );
    }
}

class MyEditor extends React.Component {

    render() {
      return (
        <Editor
          editorState={this.props.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName={styles.editor}
          onEditorStateChange={this.props.onStateChange}
        />
      )
    }
  }
  