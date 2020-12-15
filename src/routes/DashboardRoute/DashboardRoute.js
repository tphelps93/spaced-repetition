import React, { Component } from 'react';
import DataContext from '../../contexts/DataContext';
import './DashboardRoute.css';

class DashboardRoute extends Component {

  static contextType = DataContext;
  render() {
    const { language, words, totalScore } = this.context;



    let langName;
    if (language) {
      langName = language.name;
    }

    let wordList;
    if (words) {
      wordList = words.map(word => {
        return (
          <div key={word.id} className='word-list'>
            <ul>
              <li>
                <h4>{word.original}</h4> ×: {word.incorrect_count} ✓:{' '}
                {word.correct_count}
              </li>
            </ul>
          </div>
        );
      });
    }
    return (
      <section className='dashboard'>
        <h2>{langName}</h2>
        <div className='stats'>
          <h2>Total Score: {totalScore} </h2>
          <p>Correct: 0 </p>
          <p>Incorrect: 0</p>
        </div>
        <a href='/learn'>Start Practicing</a>
        <h3> Words To Practice </h3>
        {wordList}
      </section>
    );
  }
}

export default DashboardRoute;
