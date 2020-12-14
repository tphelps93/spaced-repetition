import React, { Component } from 'react';
import DataContext from '../../DataContext';

class DashboardRoute extends Component {
  static contextType = DataContext;
  render() {
    const { language } = this.context;

    console.log(language.language);
    const wordList = language.language.map(lang => {
      return (
        <div key={lang.id} className='word-list'>
          <ul>
            <li>{lang}</li>
          </ul>
        </div>
      )
    })
    return (
      <section>
        <h2> German </h2>
        <button> Start </button> 
      (word)
      </section>
    );
  }
}

export default DashboardRoute
