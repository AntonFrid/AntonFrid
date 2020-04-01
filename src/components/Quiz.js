import React from 'react';
import 'typeface-roboto';
import { stats$, updateStats } from '../store.js';

//Components
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = { stats: stats$.value };

    this.checkAnswers = this.checkAnswers.bind(this);
  }

  componentDidMount() {
    this.sub = stats$.subscribe((stats) => this.setState({ stats }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  shuffle(array) {
    if(array.length === 2) return array.sort().reverse();
    return array.sort(() => Math.random() - 0.5);
  }

  shouldComponentUpdate(nextProps, nextState) {
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

    if(stats$.value === null) {
      updateStats({
         correct: correctCount,
         total: this.props.amount,
         played: 1,
      });
    }else {
      updateStats({
         correct: parseInt(correctCount) + parseInt(this.state.stats.correct),
         total: parseInt(this.props.amount) + parseInt(this.state.stats.total),
         played: parseInt(this.state.stats.played) + 1,
      });
    }

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

                if(this.props.answersArr.length < this.props.quizArr.length) {
                  this.props.addAnswer(answers[0], index);
                }

                return (
                  <div key={'question-' + index} className='Quiz__question'>
                    <h3>Question {index + 1}</h3>
                    <p>{ this.convertHTML(value.question) }</p>
                    <RadioGroup defaultValue={ answers[0] } aria-label={ 'answers question' + (index + 1) } name={'answers' + index } onChange={ (e) => this.props.addAnswer(e.target.value, index) }>
                      { answers.map((value, index) => {
                        return <FormControlLabel key={ value + index } className='Radio__label' value={ value } control={<Radio />} label={ this.convertHTML(value) } />
                      })}
                    </RadioGroup>
                  </div>
                );
              })
            }
            { this.props.quizArr.length > 0
              ? <Button
                  type="submit"
                  variant="contained"
                  className='Button'
                >
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
