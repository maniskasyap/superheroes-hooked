import React, { Component } from 'react';

class Fighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      isLoading: false,
    };
  }

  calcScore = () => {
    const {
      combat,
      durability,
      intelligence,
      power,
      speed,
      strength,
    } = this.state.details.powerstats;
    const score = combat + durability + intelligence + power + speed + strength;
    return { ...this.state.details.powerstats, score };
  };

  fetchFighter = async id => {
    try {
      const resp = await fetch(
        `https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/id/${id}.json`,
      );
      if (resp.status === 404) {
        const newId = Math.ceil(Math.random() * 731);
        this.fetchFighter(newId);
      } else {
        const data = await resp.json();
        this.setState({
          details: data,
        });
        const { score } = this.calcScore();
        this.props.updateScore({ id: this.state.details.id, score });
      }
    } catch (error) {
      throw new Error(`error in fetching fighter with id ${id}`);
    }
  };

  componentDidMount() {
    this.fetchFighter(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.fetchFighter(this.props.id);
    }
  }

  render() {
    let showStats = false;
    const { winner } = this.props;
    const { details } = this.state;
    // const { combat, durability, intelligence, power, speed, strength } = details
    //   ? details.powerstats
    //   : {};
    // const score = combat + durability + intelligence + power + speed + strength;
    const {
      combat,
      durability,
      intelligence,
      power,
      speed,
      strength,
      score,
    } = this.state.details ? this.calcScore() : {};
    let styles = 'fighter-details h-100';
    if (winner !== 0) {
      styles += winner === details.id ? ' winner' : ' loser';
      showStats = true;
    }
    return (
      <div className="h-100">
        {details && (
          <div
            className="h-100"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div
              className={styles}
              style={{ backgroundImage: `url(${details.images.md})`, flex: 1 }}
            ></div>
            <div className="flex v-center h-space-between">
              <h4>
                {details.name} ({details.biography.publisher})
              </h4>
              {showStats && (
                <>
                  <p>
                    COM: {combat}, DUR: {durability}, INT: {intelligence}, POW:{' '}
                    {power}, SPD: {speed}, STR: {strength}
                  </p>
                  <h2>{score}</h2>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Fighter;
