import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false
    };
  }

  mapReady = ()=>{
    this.setState({mapIsReady: true})
  }
  render() {
    console.log('aaaaa')
    return (
      <div className="App">
        <Map mapIsReady={this.state.mapIsReady} mapReady={this.mapReady}/>
      </div>
    );
  }
}

export default App;
