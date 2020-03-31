import React from 'react';
import { stats$, updateStats } from '../store.js';

//components
import Button from '@material-ui/core/Button';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = { stats: stats$.value, percentage: 0 };

    this.getIncorrect = this.getIncorrect.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getRank = this.getRank.bind(this);
  }

  componentDidMount() {
    this.sub = stats$.subscribe((stats) => this.setState({ stats }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  getPercentage() {
    if(this.state.stats === null) return 0;

    let corr = this.state.stats.correct;
    let tot = this.state.stats.total;
    let num = (corr / tot) * 100;

    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  getIncorrect() {
    if(this.state.stats === null) return 0;

    let corr = this.state.stats.correct;
    let tot = this.state.stats.total;

    return tot - corr;
  }

  getRank() {
    let percentage = this.getPercentage();

    if(percentage === 0) {
      return <p style={{ color: '#ffffff' }}>NONE</p>;
    }
    else if(percentage < 10) {
      return <p style={{ color: '#ff3232' }}>TRASH</p>;
    }
    else if(percentage < 25) {
      return <p style={{ color: '#ff8484' }}>BAD</p>;
    }
    else if(percentage < 40) {
      return <p style={{ color: '#1eff00' }}>CASUAL</p>;
    }
    else if(percentage < 60) {
      return <p style={{ color: '#0070dd' }}>GOOD</p>;
    }
    else if(percentage < 75) {
      return <p style={{ color: '#a335ee' }}>PRO</p>;
    }
    else if(percentage < 90) {
      return <p style={{ color: '#ff8000' }}>LEGEND</p>;
    }
    else {
      return <p style={{ color: '	#efde02' }}>GOD</p>;
    }
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
        <p>{ this.getPercentage() }%</p>
        <h4>RANK</h4>
        { this.getRank() }
        <Button
            onClick={ () => updateStats(null) }
            variant="contained"
            className='Button__reset'
        >
        Reset stats
        </Button>
      </div>
    );
  }
}

export default Stats;
