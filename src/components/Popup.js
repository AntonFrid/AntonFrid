import React from 'react';
import FocusTrap from 'focus-trap-react';

//Components
import Button from '@material-ui/core/Button';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.restart = this.restart.bind(this);
  }

  restart() {
    this.props.fetchQuiz();
    this.props.restart();
  }

  render() {
    return (
      <div className='Popup'>
        <FocusTrap>
          <form>
            <h3>Congratulations!</h3>
            <p>You answered { this.props.correctCount }/{ this.props.amount} questions correct!</p>
            <div className='Button__wrap'>
              <Button onClick={ this.restart } className='Button'>Restart</Button>
              <Button onClick={ this.props.close } className='Button'>Close</Button>
            </div>
          </form>
        </FocusTrap>
      </div>
    );
  }
}

export default Popup;
