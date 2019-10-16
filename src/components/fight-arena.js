import React, { Component } from 'react';
import Superhero from './superhero';

class FightArena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: null,
      fighter2: null,
      winner: 0,
      isLoading: false,
    };
    this.fight = this.fight.bind(this);
  }

  fetchFighters() {
    try {
      this.fetchFighter(this.props.id1, 1);
      this.fetchFighter(this.props.id2, 2);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.fetchFighters();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id1 !== this.props.id1 || prevProps.id2 !== this.props.id2) {
      this.setState({ isLoading: true, winner: 0 });
      this.fetchFighters();
    }
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
      throw new Error('error in fetching fighters');
    }
  };

  fight() {
    const stats1 = this.state.fighter1.powerstats;
    const stats2 = this.state.fighter2.powerstats;

    const score1 = this.calcScore(stats1);
    const score2 = this.calcScore(stats2);

    const winner =
      score1 > score2 ? this.state.fighter1.id : this.state.fighter2.id;

    this.setState({ winner });
  }

  calcScore = stats => {
    const { combat, durability, intelligence, power, speed, strength } = stats;
    return combat + durability + intelligence + power + speed + strength;
  };

  render() {
    return (
      <div className="fight-arena h-100">
        {this.state.fighter1 && this.state.fighter2 && !this.state.isLoading && (
          <>
            <div className="fighter h-100">
              <Superhero
                details={this.state.fighter1}
                winner={this.state.winner}
              />
            </div>
            <button className="fight-btn" onClick={this.fight}>
              FIGHT
            </button>
            <div className="fighter h-100">
              <Superhero
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
