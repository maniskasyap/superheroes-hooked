import React, { Component } from 'react';
import Superhero from './superhero';

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

  componentDidMount() {
    const id1 = Math.ceil(Math.random() * 731);
    const id2 = Math.ceil(Math.random() * 731);
    this.fetchFighter(id1, 1);
    this.fetchFighter(id2, 2);
  }

  fetchFighter = async (id, index) => {
    try {
      const resp = await fetch(
        `https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/id/${id}.json`,
      );
      if (resp.status === 404) {
        const newId = Math.ceil(Math.random() * 731);
        this.fetchFighter(newId, index);
      } else {
        const data = await resp.json();
        if (index === 1) {
          this.setState({
            fighter1: data,
          });
        } else {
          this.setState({
            fighter2: data,
          });
        }
      }
    } catch (error) {
      debugger;
    }
  };

  fight() {
    const stats1 = this.state.fighter1.powerstats;
    const stats2 = this.state.fighter2.powerstats;

    const score1 = this.calcScore(stats1);
    const score2 = this.calcScore(stats2);

    const winner = score1 > score2 ? 1 : 2;

    this.setState({ winner });
  }

  calcScore = stats => {
    const { combat, durability, intelligence, power, speed, strength } = stats;
    return combat + durability + intelligence + power + speed + strength;
  };

  render() {
    return (
      <div className="fight-arena h-100">
        {this.state.fighter1 && this.state.fighter2 && (
          <>
            <div className="fighter h-100">
              <Superhero
                fighter={1}
                details={this.state.fighter1}
                winner={this.state.winner}
              />
            </div>
            <button className="fight-btn" onClick={this.fight}>
              FIGHT
            </button>
            <div className="fighter h-100">
              <Superhero
                fighter={2}
                details={this.state.fighter2}
                winner={this.state.winner}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default FightArena;
