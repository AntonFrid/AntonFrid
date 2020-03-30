import React from 'react';
import 'typeface-roboto';

//Components
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.checkAnswers = this.checkAnswers.bind(this);
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.quizArr === this.props.quizArr) return false;

    return true;
  }

  checkAnswers(e) {
    e.preventDefault();
    let correctCount = 0;

    if(this.props.answersArr.length < this.props.amount || this.props.answersArr.includes(undefined)) return;

    for (let i = 0; i < this.props.answersArr.length; i++) {
      if(this.props.answersArr[i] === this.props.quizArr[i].correct_answer) correctCount++;
    }

    this.props.spawnPopup(correctCount);
  }

  convertHTML(str) {
    return str.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\"")
      .replace(/&apos;/g, "'")
      .replace(/&#039;/g,"'");
  }

  render() {
    return (
      <div onScroll={ this.props.onScroll } className='Quiz'>
        <form onSubmit={ this.checkAnswers }>
          <FormControl component="fieldset">
            {
              this.props.quizArr.map((value, index) => {
                let answers = this.shuffle(value.incorrect_answers.concat(value.correct_answer));

                return (
                  <div key={'question-' + index} className='Quiz__question'>
                    <h3>Question {index + 1}</h3>
                    <p>Q{index + 1}. { this.convertHTML(value.question) }</p>
                    <RadioGroup aria-label="answers" name={'answers' + index } onChange={ (e) => this.props.addAnswer(e.target.value, index) }>
                      { answers.map((value, index) => {
                        return <FormControlLabel key={ value + index } className='Radio__label' value={ value } control={<Radio />} label={ this.convertHTML(value) } />
                      })}
                    </RadioGroup>
                  </div>
                );
              })
            }
            { this.props.quizArr.length > 0
              ? <Button type="submit" variant="contained" className='Button'>
                  Check Answers
                </Button>
              : null
            }
          </FormControl>
        </form>
      </div>
  );
  }
}

export default Quiz;
