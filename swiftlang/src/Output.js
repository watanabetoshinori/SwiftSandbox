import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class Output extends React.Component {

  // Render

  render() {
    return (
      <form>
        <FormGroup controlId="input" style={{ }}>
          <ControlLabel>Input</ControlLabel>
          <FormControl 
            componentClass="textarea" 
            className="textarea-flat"
            placeholder="Please enter sample input" 
            onChange={this.props.inputDidChangeHandler}
            style={{height:'calc(40vh - 106px)'}}
            value={this.props.input}
            />
        </FormGroup>
        <FormGroup controlId="result" style={{ }}>
          <ControlLabel>Output</ControlLabel>
          <FormControl.Static style={{whiteSpace:"pre-line", height:'calc(60vh - 106px)', overflowY:'scroll' }}>{this.props.output}</FormControl.Static>
        </FormGroup>
      </form>
    );
  }
}
  
export default Output;
