import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as V from 'victory';
import { VictoryLine, VictoryTheme, VictoryChart,VictoryStack,VictoryAxis  } from 'victory';
import Websocket from 'react-websocket';
 

class App extends Component {
constructor(dataA,dataD,dataV){
  super(); 
   this.dataV= [{x:0, y:0}];
  this.dataD= [{x:0, y:0}]; 
  this.dataA=[{x:0, y:0}]; 
  this.websocket =new Websocket({url:"wss://wloop.localtunnel.me",protocol: "wss"}); 
  this.braking_temp; 
  this.prop_temp; 
  this.CurrentState; 
}

  handleData(data) {
    let result = JSON.parse(data);
    this.dataV.push({x: result.velocity, y:result.time}); 
   this.dataD.push({x: result.distance, y:result.time}); 
    this.dataA.push({x: result.Acceleration, y:result.time}); 
    this.braking_temp=result.Braking_temp; 
    this.prop_temp=result.Propulsion_temp;
    this.CurrentState=result.Pod_state;
  }
  Brake(){
    var podState = { "Pod State": "Brake"};
    this.websocket.send(JSON.stringify(podState));
    console.log(podState["Pod State"]);
  }
  Ready(){
    var podState = { "Pod State": "READY"};
    this.websocket.send(JSON.stringify(podState));
    console.log(podState["Pod State"]);
  }
  Accelerate(){
    var podState = { "Pod State": "ACEEL"};
    this.websocket.send(JSON.stringify(podState));
    console.log(podState["Pod State"]);
  }

  render() {
    return (
      <div className="App">
          <Websocket url='wss://wloop.localtunnel.me'
              onMessage={this.handleData.bind(this)}/>
      <div className='graph'>
      <VictoryChart
      theme={VictoryTheme.material}
      >
    <VictoryStack
     colorScale={["tomato", "orange", "gold"]}
    >
      <VictoryLine
        style={{
          data: { stroke: "#f1f442", width: "50%", height: "50%" },
          parent: { border: "1px solid #ccc"}
        }}
        data={this.dataA}
      /><VictoryLine
      style={{
        data: { stroke: "#63625d", width: "50%", height: "50%" },
        parent: { border: "1px solid #ccc"}
      }}
      data={this.dataV}
    /><VictoryLine
    style={{
      data: { stroke: "#050505", width: "50%", height: "50%" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.dataD} 
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
      <p>Braking Temperature: {this.braking_temp}</p>
    </label>
    <label>
      <p>Propulsion Temperature: {this.prop_temp}</p>
    </label>
    <label>
      <p>State: {this.CurrentState}</p>
    </label>
  </div>
  </div>
    );
  }
}

export default App;