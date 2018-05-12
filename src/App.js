import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as V from 'victory';
import { VictoryLine, VictoryTheme, VictoryChart,VictoryStack } from 'victory';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className='graph'>
      <VictoryChart
      theme={VictoryTheme.material}
    >
    <VictoryStack
  colorScale={["tomato", "orange", "gold"]}
>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31", width: "50%", height: "50%" },
          parent: { border: "1px solid #ccc"}
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 }
        ]}
      /><VictoryLine
      style={{
        data: { stroke: "#c43a31", width: "50%", height: "50%" },
        parent: { border: "1px solid #ccc"}
      }}
      data={[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ]}
    /><VictoryLine
    style={{
      data: { stroke: "#c43a31", width: "50%", height: "50%" },
      parent: { border: "1px solid #ccc"}
    }}
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]}
  /></VictoryStack>
    </VictoryChart>
    </div>
  </div>
    );
  }
}

export default App;