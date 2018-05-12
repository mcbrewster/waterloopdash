import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as V from 'victory';
import { VictoryLine, VictoryTheme, VictoryChart,VictoryStack,VictoryAxis  } from 'victory';
//import Websocket from 'react-websocket';
exclude: /node_modules/; 
 

class App extends Component {
constructor(dataA,dataD,dataV){
  super(); 
   this.state = {
     dataV: [{x:0, y:0}],
    dataD:[{x:0, y:0}],
    dataA:[{x:0, y:0}],
    braking_temp:0 , 
    prop_temp: 0,
    CurrentState: 0, 
    Motherboard_temp: 0};

  this.websocket =new WebSocket("wss://wloop2.localtunnel.me");
  this.websocket.onopen = function(){console.log("connected");};
  this.websocket.onmessage = this.handleData.bind(this);
  this.Brake= this.Brake.bind(this); 
}

  handleData(data) {
    console.log("working ", data.data);
    var result = JSON.parse(data.data);
    console.log(result.time_since_start, result.velocity);
    this.state.dataV.push({x: result.time_since_start, y: result.velocity}); 
    this.state.dataD.push({x: result.time_since_start, y:result.distance}); 
    this.state.dataA.push({x: result.time_since_start, y:result.acceleration}); 
    this.setState({
      dataV: this.state.dataV,
      dataD: this.state.dataD,
      dataA: this.state.dataA,
      braking_temp: result.braking_temp,
      CurrentState: result.pod_state,
      Motherboard_temp: result.motherboard_temp,
      prop_temp: result.propulsion_temp,
    });
    console.log(this.prop_temp); 
  
  }
  Brake(){
    console.log(this.websocket.state.ws);
    this.websocket.state.ws.send('{Pod_state : "BRAKE"}');
  }
  Ready(){
    const socket = new WebSocket('wss://wloop2.localtunnel.me');
    this.websocket.state.ws.send('{Pod_state : "READY"}');
  }
  Accelerate(){
    const socket = new WebSocket('wss://wloop2.localtunnel.me');
    this.websocket.state.ws.send('{Pod_state : "ACCELERATE"}');

  }
  

  render() {
    console.log("working");
    return (
      <div className="App">
      <div className='graph'>
      <VictoryChart
      theme={VictoryTheme.material}
      >
      <VictoryStack>
  
      <VictoryLine
        style={{
          data: { stroke: "#f1f442", width: "50%", height: "50%" },
          parent: { border: "1px solid #ccc"}
        }}
        data={this.state.dataA}
      /><VictoryLine
      style={{
        data: { stroke: "#63625d", width: "50%", height: "50%" },
        parent: { border: "1px solid #ccc"}
      }}
      data={this.state.dataV}
    /><VictoryLine
    style={{
      data: { stroke: "#050505", width: "50%", height: "50%" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.state.dataD} 
  /></VictoryStack>
    </VictoryChart>
    </div>
    <div className="buttons">
    <button id="brake" onClick={this.Brake}>
      Brake  
    </button>
    <button onClick={this.Ready}>
      Ready
    </button>
    <button onClick={this.Accelerate}>
      Accelerate
    </button>
  </div>
  <div className="display">
    <label>
      <p>Braking Temperature: {this.state.braking_temp}</p>
    </label>
    <label>
      <p>Propulsion Temperature: {this.state.prop_temp}</p>
    </label>
    <label>
      <p>Mother Board Temperature: {this.state.Motherboard_temp}</p>
    </label>
    <label>
      <p>State: {this.state.CurrentState}</p>
    </label>
  </div>
  </div>
    );
  }
}

export default App;