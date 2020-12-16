import React from 'react';
import Button from '../Button/Button';
import LearningContext from '../../contexts/LearningContext';
// import './Feedback.css';

class Feedback extends React.Component {
  static contextType = LearningContext;

  handleClick = () => {
    this.context.setIsResultDisplayed(false);
  };

  renderMessage = () => {
    if (this.context.isCorrect) {
      return <h2> Good Job!</h2>;
    } else {
      return <h2> Incorrect </h2>;
    }
  };

  render() {
    return (
      <section id='feedback'>
        <div className='DisplayFeedback'>
          {this.renderMessage()}
          <p>
            The correct translation for{' '}
            <span en='fr'>{this.context.prevWord}</span> was{' '}
            {this.context.answer} and you chose {this.context.guess}!
          </p>
          <Button onClick={this.handleClick}> Next Word </Button>
        </div>
      </section>
    );
  }
}

export default Feedback;
