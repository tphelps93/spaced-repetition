import React, { Component } from 'react';
import LearningContext from '../../contexts/LearningContext';
import { submitGuess, fetchWords } from '../../services/api-service';
import './LearningRoute.css';
import Feedback from '../../components/Feedback/Feedback';

class LearningRoute extends Component {
  static contextType = LearningContext;

  handleSubmit(guess) {
    submitGuess(guess).then(result => {
      this.context.setPrevWord(this.context.nextWord);
      this.context.clearError();
      this.context.setTotalScore(result.totalScore);
      this.context.setWordCorrectCount(result.wordCorrectCount);
      this.context.setWordIncorrectCount(result.wordIncorrectCount);
      this.context.setNextWord(result.nextWord);
      this.context.setAnswer(result.answer);
      this.context.setGuess(guess);
      this.context.setIsCorrect(result.isCorrect);
      this.context.setIsResultDisplayed(true);
    });
  }

  componentDidMount() {
    fetchWords()
      .then(data => {
        if (!data) {
          console.error(data);
          throw new Error('Something went wrong');
        }
        this.context.setNextWord(data.nextWord);
        this.context.setTotalScore(data.totalScore);
        this.context.setWordCorrectCount(data.wordCorrectCount);
        this.context.setWordIncorrectCount(data.wordIncorrectCount);
      })
      .catch(e => {
        console.error(e);
      });
  }
  
  render() {
    return (
      <section id='learning-container'>
        {!this.context.isResultDisplayed ? (
          <section role='form'>
            <div className='translate-container'>
              <h2 className='instructions-header'>Translate the word:</h2>
              <span>{this.context.nextWord}</span>
            </div>
            <form
              htmlFor='guessForm'
              id='submit-form'
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit(e.target.guessForm.value);
              }}
            >
              <label htmlFor='learn-guess-input'>
                Translation
              </label>
              <input
                type='text'
                name='guessForm'
                id='learn-guess-input'
                required
              ></input>
              <button type='submit'>Submit Answer</button>
            </form>
          </section>
        ) : <Feedback />}
        <div className='DisplayScore'>
          <p className='total-score word-score-keeper'>
            Total Score: {this.context.totalScore}
          </p>
        </div>
        <p className='word-score-keeper'>
          You have answered this word correctly {this.context.wordCorrectCount}{' '}
          times.
        </p>
        <p className='word-score-keeper'>
          You have answered this word incorrectly{' '}
          {this.context.wordIncorrectCount} times.
        </p>
      </section>
    );
  }
}

export default LearningRoute;
