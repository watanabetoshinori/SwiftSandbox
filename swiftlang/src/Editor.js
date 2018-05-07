import React from 'react';
import { render } from 'react-dom';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/swift/swift';
import './sandbox.css';

class Editor extends React.Component {

  // Render

  render() {
    const code = this.props.code;

    return (
      <CodeMirror
        value={code}
        className="sandbox"
        options={{
          mode: 'swift',
          theme: 'sandbox',
          readOnly: false,
          tabSize: 2,
          lineWrapping: true,
          lineNumbers: true,          
        }}
        onChange={this.props.codeDidChangeHandler}
      />
    );
  }
}

export default Editor;
