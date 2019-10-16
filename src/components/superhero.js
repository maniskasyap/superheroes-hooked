import React, { Component } from 'react';

class Superhero extends Component {
  state = {};
  render() {
    let showStats = false;
    const { details, winner } = this.props;
    const {
      combat,
      durability,
      intelligence,
      power,
      speed,
      strength,
    } = details.powerstats;
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
                  <h2>
                    {combat +
                      durability +
                      intelligence +
                      power +
                      speed +
                      strength}
                  </h2>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Superhero;
