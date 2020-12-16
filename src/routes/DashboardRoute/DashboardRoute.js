import React, { Component } from 'react';
import DataContext from '../../contexts/DataContext';
import './DashboardRoute.css';
import { fetchLanguage } from '../../services/api-service';

class DashboardRoute extends Component {
  static contextType = DataContext;

  componentDidMount() {
    fetchLanguage().then(response => {
      this.context.setLanguage(response.language);
      this.context.setWords(response.words);
    });
  }
  render() {
    let wordList;
    wordList = this.context.words.map(word => {
      return (
        <ul key={word.id} className='list'>
          <li>{word.original} ✅: {word.correct_count} ❌: {word.incorrect_count}</li>
        </ul>
      );
    });
    return (
      <section className='dashboard'>
        <h2> {this.context.language.name} </h2>
        <div className='stats'>
          <h2>Total Score: {this.context.language.total_score} </h2>

        </div>
        <a href='/learn'>Start Practicing</a>
        <h3> Words To Practice </h3>
        <div className='word-list'>{wordList}</div>
      </section>
    );
  }
}

export default DashboardRoute;
