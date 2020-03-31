import React from 'react';
import { stats$ } from '../store.js';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = { stats: stats$.value };

    this.getIncorrect = this.getIncorrect.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
  }

  componentDidMount() {
    this.sub = stats$.subscribe((stats) => this.setState({ stats }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  getPercentage() {
    if(this.state.stats === null) return 0 + '%';

    let corr = this.state.stats.correct;
    let tot = this.state.stats.total;

    return (corr / tot) * 100 + '%';
  }

  getIncorrect() {
    if(this.state.stats === null) return 0;

    let corr = this.state.stats.correct;
    let tot = this.state.stats.total;

    return tot - corr;
  }

  render() {
    return(
      <div className='Stats'>
        <h4>GAMES PLAYED</h4>
        <p>{ this.state.stats === null ? '0' : this.state.stats.played }</p>
        <h4>CORRECT ANSWERS</h4>
        <p>{ this.state.stats === null ? '0' : this.state.stats.correct }</p>
        <h4>INCORRECT ANSWERS</h4>
        <p>{ this.getIncorrect() }</p>
        <h4>CORRECT PERCENTAGE</h4>
        <p>{ this.getPercentage() }</p>
      </div>
    );
  }
}

export default Stats;
