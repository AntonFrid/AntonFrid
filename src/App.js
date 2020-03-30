import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';

//CSS
import './App.css';

//Components
import Main from './components/Main.js';
import Quiz from './components/Quiz.js';
import Header from './components/Header.js';
import Popup from './components/Popup.js';
import Menu from './components/Menu.js';
import BeatLoader from "react-spinners/BeatLoader";
import { MuiThemeProvider as ThemeProvider  } from '@material-ui/core/styles';
import FocusTrap from 'focus-trap-react';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      correctCount: 0,
      menu: false,
      home: true,
      quizArr: [],
      questionAmount: 5,
      loading: false,
      fade: true,
    };

    this.answersArr = [];

    this.overrideCSS = {
      display: 'block',
      position: 'absolute',
      left: '-45px',
      marginLeft: '50%',
      top: '-15px',
      marginTop: '100%',
      borderColor: '#7289da',
    };

    this.theme = createMuiTheme({
      palette: {
        primary: { main: '#99aab5' },
        secondary: { main: '#7289da' },
      },
      status: {
        danger: 'orange',
      },
    });

    this.spawnPopup = this.spawnPopup.bind(this);
    this.spawnPopupRestart = this.spawnPopupRestart.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchHome = this.switchHome.bind(this);
    this.fetchQuiz = this.fetchQuiz.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.changeQuestionAmount = this.changeQuestionAmount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  spawnPopup(correctCount) {
    if(this.state.popup) {
      this.answersArr = [];
      this.setState({ popup: false, correctCount: 0, home: true, quizArr: [], fade: true });
    }else {
      this.setState({ popup: true, correctCount: correctCount });
    }
  }

  spawnPopupRestart(correctCount) {
    if(this.state.popup) {
      this.answersArr = [];
      this.setState({ popup: false, correctCount: 0, quizArr: [], fade: true });
    }else {
      this.setState({ popup: true, correctCount: correctCount });
    }
  }

  toggleMenu() {
    if(this.state.menu) {
      this.setState({ menu: false });
    }else {
      this.setState({ menu: true });
    }
  }

  switchHome() {
    if(this.state.home) {
      this.setState({ home: false });
    }else {
      this.setState({ home: true, quizArr: [], correctCount: 0 })
    }
  }

  fetchQuiz() {
    this.setState({ loading: true });

    axios.get('https://opentdb.com/api.php?amount=' + this.state.questionAmount)
      .then((res) => {
        this.setState({ quizArr: res.data.results, loading: false });
      })
  }

  addAnswer(value, index) {
    this.answersArr[index] = value;
  }

  changeQuestionAmount(amount) {
    this.setState({ questionAmount: amount })
  }

  handleScroll(e) {
    const bottom = e.target.scrollHeight - (e.target.scrollTop + 1) < e.target.clientHeight;

    if (bottom && this.state.fade && e.target.scrollTop !== 0) {
      this.setState({ fade: false });
    }
    else if(!bottom && !this.state.fade) {
      this.setState({ fade: true });
    }
  }

  render() {
    return (
      <ThemeProvider theme={ this.theme }>
        <div className="App">
          <div className='App__inner'>
            <FocusTrap active={ this.state.menu }>
              <div className='FocusTrap__div'>
                <Header
                  page={ {
                    home: this.state.home,
                    about: false,
                    stats: false,
                    menu: this.state.menu,
                  } }
                  toggleMenu={ this.toggleMenu }/>
                <Menu home={ this.state.home } closeMenu={ this.toggleMenu } goHome={ this.switchHome } showMenu={ this.state.menu } />
              </div>
            </FocusTrap>
            <Router>
              { this.state.home
                ? <Redirect to='/'/>
                : null
              }
              <Route exact path='/' render={(props) => <Main updateAmount={ this.changeQuestionAmount } fetchQuiz={ this.fetchQuiz } switchHome={ this.switchHome }/>} />
              <Route path='/quiz' render={(props) => <Quiz onScroll={ this.handleScroll } amount={ this.state.questionAmount } answersArr={ this.answersArr } addAnswer={ this.addAnswer } quizArr={ this.state.quizArr } spawnPopup={ this.spawnPopup }/>} />
            </Router>
            <div className={ !this.state.home
                ? (this.state.fade ? 'fade__overlay' : 'fade__overlay__hidden')
                : 'fade__overlay__hidden'
              }>
            </div>
            { this.state.popup ? <Popup amount={ this.state.questionAmount } fetchQuiz={ this.fetchQuiz } correctCount={ this.state.correctCount } close={ this.spawnPopup } restart={ this.spawnPopupRestart }/> : null }
            <BeatLoader
              css={this.overrideCSS}
              size={30}
              color={"#99aab5"}
              loading={this.state.loading}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
