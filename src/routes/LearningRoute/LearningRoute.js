import React, { Component } from 'react';
import DataContext from '../../contexts/DataContext';

class LearningRoute extends Component {
  static contextType = DataContext;
  render() {
    const { language, words } = this.context;

    return (
      <section>
        <input type='text'></input>
        <button> Submit Answer </button>
      </section>
    );
  }
}

export default LearningRoute;
