import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';

import uuidv4 from 'uuid/v4';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Image from 'react-bootstrap/lib/Image';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

import Editor from './Editor';
import Output from './Output';
import Settings from './Settings';

const kInitialCode = 'import Foundation\n\n';

class App extends Component {

  constructor() {
    super();

    const uuid = sessionStorage.getItem('uuid') || uuidv4();
    const code = sessionStorage.getItem('code');
    const input = sessionStorage.getItem('input');

    this.state = {
      uuid: uuid,
      code: code || kInitialCode,
      input: input || '',
      output: ''
    };

    this.inputDidChangeHandler = this.inputDidChange.bind(this);
    this.codeDidChangeHandler = this.codeDidChange.bind(this);

    this.newDidTappedHandler = this.newDidTapped.bind(this);
    this.runDidTappedHandler = this.runDidTapped.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/version')
    .then((res) => res.text())
    .then((text) => this.setState({ output: text }))
    .catch((error) => this.setState({ output: error.message }));
  }

  // Handling Events

  inputDidChange(e) {
    sessionStorage.setItem('input', e.target.value);
    this.setState({ input: e.target.value });
  }

  codeDidChange(newValue, e) {
    sessionStorage.setItem('code', newValue);
    this.setState({ code: newValue });
  }

  newDidTapped(e) {
    sessionStorage.removeItem('code');
    sessionStorage.removeItem('input');
    this.setState({ code: kInitialCode, input: '', output: '' });
  }

  runDidTapped(e) {
    this.setState({ output: '' });

    let data = "uuid=" + encodeURIComponent(this.state.uuid)
               + "&" + 
               "code=" + encodeURIComponent(this.state.code)
               + "&" + 
               "input=" + encodeURIComponent(this.state.input)

    fetch('http://localhost:3001/run', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      body: data
    })
    .then((res) => res.text())
    .then((text) => this.setState({ output: text }))
    .catch((error) => this.setState({ output: error.message }));
  }

  // Render

  render() {
    return (
      <div>
        <Navbar className="headerbar" fixedTop={true} fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Image src="/logo.png" />
            </Navbar.Brand>
            <h3 class="navbar-text">Swift Sandbox</h3>
          </Navbar.Header>
        </Navbar>
        <Grid fluid={true} className="content">
          <Row className="show-grid">
            <Col md={6} className="container">
              <Editor 
                code={this.state.code}
                codeDidChangeHandler={this.codeDidChangeHandler}
              />
            </Col>
            <Col md={6}>
              <div style={{ padding: 15 }}>
                <Output 
                input={this.state.input}
                output={this.state.output} 
                inputDidChangeHandler={this.inputDidChangeHandler} 
                />
              </div>
            </Col>
          </Row>
        </Grid>
        <Navbar className="footerbar" fixedBottom={true} fluid={true}>
          <Grid fluid={true}>
            <Row className="show-grid">
              <Col md={4} className="text-left">
                <Button bsStyle="link" bsSize="large" onClick={this.newDidTappedHandler}>
                  <Glyphicon glyph="edit" /> New
                </Button>
              </Col>
              <Col md={4} className="text-center">
                <Button bsStyle="link" bsSize="large" onClick={this.runDidTappedHandler}>
                  <Glyphicon glyph="play" className="glyphicon-ex" /> 
                </Button>
              </Col>
              <Col md={4} className="text-right">
                <Settings />
              </Col>
            </Row>
          </Grid>
        </Navbar>
      </div>
    );
  }
}

export default App;
