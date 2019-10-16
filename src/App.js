import React, { Component } from 'react';
import FightArena from './components/fight-arena';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id1: 414,
      id2: 332,
    };
  }

  randomId = () => {
    return Math.ceil(Math.random() * 731);
  };

  getNewFighters = () => {
    this.setState({
      id1: this.randomId(),
      id2: this.randomId(),
    });
  };

  render() {
    return (
      <div className="App h-100">
        <div className="header">
          <span>Super Combat</span>
          <button className="btn new-fight" onClick={this.getNewFighters}>New Fight</button>
        </div>
        <FightArena id1={this.state.id1} id2={this.state.id2} />
      </div>
    );
  }
}

export default App;
