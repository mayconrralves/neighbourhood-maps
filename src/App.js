import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapIsReady: false
    }
  }

   
  mapReady = ()=>{
    this.setState({mapIsReady: true})
  }
  render() {
     //alert("aaa"+ this.state.mapIsReady)
    return (
        <Map map={this.state.map} mapIsReady={this.state.mapIsReady} mapReady={this.mapReady}/>
        
    );
  }
}

export default App;
