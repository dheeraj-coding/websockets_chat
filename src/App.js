import React, { Component } from 'react';
import './App.css';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.message}</p>
        <hr />
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onMsgRecieve = this.onMsgRecieve.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080/ws");
    this.socket.addEventListener('open', (event) => this.socket.send("Hello"));
    this.socket.addEventListener('message', this.onMsgRecieve);
  }
  onMsgRecieve(event) {
    let msg = JSON.parse(event.data);
    this.setState((prevState) => {
      prevState.messages.push(msg);
      return { messages: prevState.messages };
    });
  }
  handleSubmit(event) {
    let msg = {
      "name": document.getElementById("name").value,
      "message": document.getElementById("message").value,
    };
    this.socket.send(JSON.stringify(msg));
  }
  render() {
    return (
      <div>
        <label>
          Name:
          <input type="text" id="name" />
        </label>
        <br />
        <br />
        <label>
          Message:
          <input type="text" id="message" />
        </label>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
        <Message name="Hey" message="Voila!" />
        {this.state.messages.map(msg => <Message name={msg.name} message={msg.message} />)}
      </div>
    );
  }
}

export default App;
