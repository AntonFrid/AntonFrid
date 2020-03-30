import React from 'react';
import { Redirect } from 'react-router-dom';

//Components
import Button from '@material-ui/core/Button';

import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { redirect: false };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ redirect: true });
    this.props.fetchQuiz();
    this.props.switchHome();
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/quiz'/>
    }

    return (
      <div className='Main'>
        <FormControl component="fieldset">
          <FormLabel className='FormLabel' component="legend">Choose the amount of questions</FormLabel>
          <RadioGroup aria-label="amount" name='amount' onChange={ (e) => this.props.updateAmount(e.target.value) }>
            <FormControlLabel className='Radio__label' value='5' control={<Radio />} label='Five' />
            <FormControlLabel className='Radio__label' value='10' control={<Radio />} label='Ten' />
            <FormControlLabel className='Radio__label' value='15' control={<Radio />} label='Fifteen' />
            <FormControlLabel className='Radio__label' value='20' control={<Radio />} label='Twenty' />
          </RadioGroup>
        </FormControl>
        <Button onClick={ this.onClick } variant="contained" className='Button'>Start quiz</Button>
      </div>
    );
  }
}

export default Main;
