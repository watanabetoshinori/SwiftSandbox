import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
  
class Editor extends React.Component {

  // Control Events
  
  editorWillMount(monaco) {
    monaco.editor.defineTheme('swiftsandbox', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment.swift', foreground: '345f95' },
        { token: 'string.swift', foreground: '4a56a8' },
        { token: 'string.quote.swift', foreground: '4a56a8' },
        { token: 'number.swift', foreground: '59cdad' },
        { token: 'number.float.swift', foreground: '59cdad' },
        { token: 'number.hex.swift', foreground: '59cdad' },
        { token: 'number.octal.swift', foreground: '59cdad' },
        { token: 'number.binary.swift', foreground: '59cdad' },
      ],
      colors: {
        'editor.background': '#162638',
        'editorLineNumber.foreground': '#5a718e',
        'editorLineNumber.background': '#ffffff',
        'editorGutter.background': '#1e2f42',
      }
    });
    monaco.editor.setTheme('swiftsandbox');
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }

  // Render

  render() {
    const code = this.props.code;

    const options = {
      autoClosingBrackets: true,
      automaticLayout: true,
      autoIndent: true,
      contextmenu: false,
      cursorBlinking: "blink",
      dragAndDrop: false,
      fontSize: 14,
      folding: true,
      formatOnPaste: true,
      formatOnType: false,
      lightbulb: { 
        enabled: true 
      },
      lineNumbers: true,
      matchBrackets: true,
      minimap: { 
        enabled: false 
      },
      renderControlCharacters: true,
      renderIndentGuides: true,
      renderLineHighlight: "none",
      scrollbar: {
        verticalHasArrows: true,
        useShadows: false
      },
      scrollBeyondLastLine: false,
      selectOnLineNumbers: true,
      selectionClipboard: false,
      selectionHighlight: false,
      suggestOnTriggerCharacters: false,
      wordBasedSuggestions: false,
      wordWrap: 'bounded',
    };
    return (
      <MonacoEditor
        language="swift"
        value={code}
        options={options}
        onChange={this.props.codeDidChangeHandler}
        editorWillMount={this.editorWillMount}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
