import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import LearningRoute from '../../routes/LearningRoute/LearningRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import './App.css';
import DataContext from '../../contexts/DataContext';
import { fetchLanguage, fetchWords } from '../../services/api-service';

export default class App extends Component {
  state = {
    language: [],
    words: [],
    totalScore: 0,
    incorrect: 0,
    correct: 0,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }


  // hit head first time only
  // on guesses use 'guess' resp to update state (incorrect, correct)
  // after posting 'guess' display incorrect and correct they got
  componentDidMount() {
    let promises = [fetchLanguage(), fetchWords()];
    Promise.all(promises)
      .then(values => {
        console.log(values);
        this.setState({
          language: values[0],
          words: values[1].nextWord,
          // totalScore: values[0].nextWord.total_score,
          // incorrect: values[1].nextWord.incorrect_count,
          // correct: values[1].nextWord.correct_count,
        });
      })
      .catch(hasError => {
        this.setState({
          hasError,
        });
      });
  }

  render() {
    const contextValue = {
      language: this.state.language,
      words: this.state.words,
      totalScore: this.state.totalScore,
      incorrect: this.state.incorrect,
      correct: this.state.correct,
      hasError: this.state.hasError,
    };

    console.log(this.state.words);
    return (
      <DataContext.Provider value={contextValue}>
        <div className='App'>
          <Header />
          <main>
            {contextValue.hasError && <p>There was an error! Oh no!</p>}
            <Switch>
              <PrivateRoute exact path={'/'} component={DashboardRoute} />
              <PrivateRoute path={'/learn'} component={LearningRoute} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute path={'/login'} component={LoginRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
          </main>
        </div>
      </DataContext.Provider>
    );
  }
}
