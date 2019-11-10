import React, { createContext, Component } from 'react';
import TestLazy from './testLazy';
import Memo from './Memo.jsx';
import './App.css';

const BatteryContext = createContext();
const OnlineContext = createContext();

class Leaf extends Component {
  static contextType = BatteryContext;
  render() {
    const battery = this.context;
    return (
      <div>
        <h1>Battery:{battery}</h1>
        <TestLazy></TestLazy>
      </div>

    );
  }
}



class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    battery: 60,
    online: false
  }
  render() {
    const { battery, online } = this.state;
    return (
      <div>
        <BatteryContext.Provider value={battery}>
          <OnlineContext.Provider value={online}>
            <button type="button" onClick={() => { this.setState({ battery: battery - 1 }) }}>press</button>
            <button type="button" onClick={() => { this.setState({ online: !online }) }}>switch</button>
            <Middle />
          </OnlineContext.Provider>
        </BatteryContext.Provider>
        <Memo></Memo>
      </div>

    );
  }
}

export default App;
