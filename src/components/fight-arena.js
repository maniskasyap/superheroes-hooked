import React, { Component } from 'react';
import Fighter from './fighter';

class FightArena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: null,
      fighter2: null,
      winner: 0,
    };
    this.fight = this.fight.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id1 !== this.props.id1 || prevProps.id2 !== this.props.id2) {
      this.setState({ isLoading: true, winner: 0 });
    }
  }

  fight() {
    const winner =
      this.state.fighter1.score > this.state.fighter2.score
        ? this.state.fighter1.id
        : this.state.fighter2.id;

    this.setState({ winner });
  }

  update1 = score => {
    this.setState({
      fighter1: score,
    });
  };

  update2 = score => {
    this.setState({
      fighter2: score,
    });
  };

  render() {
    return (
      <div className="fight-arena h-100">
        <>
          <div className="fighter h-100">
            <Fighter
              id={this.props.id1}
              updateScore={this.update1}
              winner={this.state.winner}
            />
          </div>
          <button className="fight-btn btn" onClick={this.fight}>
            FIGHT
          </button>
          <div className="fighter h-100">
            <Fighter
              id={this.props.id2}
              updateScore={this.update2}
              winner={this.state.winner}
            />
          </div>
        </>
      </div>
    );
  }
}

export default FightArena;
