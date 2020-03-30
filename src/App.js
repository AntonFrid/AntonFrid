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
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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
    };

    this.answersArr = [];

    this.overrideCSS = {
      display: 'block',
      position: 'absolute',
      left: '-45px',
      marginLeft: '50%',
      top: '-15px',
      marginTop: '100%',
      borderColor: 'red',
    };

    this.theme = createMuiTheme({
      palette: {
        primary: { 500: '#99aab5' },
        secondary: { A400: '#7289da' },
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
  }

  spawnPopup(correctCount) {
    if(this.state.popup) {
      this.answersArr = [];
      this.setState({ popup: false, correctCount: 0, home: true, quizArr: [] });
    }else {
      this.setState({ popup: true, correctCount: correctCount });
    }
  }

  spawnPopupRestart(correctCount) {
    if(this.state.popup) {
      this.answersArr = [];
      this.setState({ popup: false, correctCount: 0, quizArr: [] });
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
      this.setState({ home: true })
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

  render() {
    return (
      <ThemeProvider theme={ this.theme }>
        <div className="App">
          <div className='App__inner'>
            <Header toggleMenu={ this.toggleMenu }/>
            <Menu showMenu={ this.state.menu } />
            <Router>
              { this.state.home
                ? <Redirect to='/'/>
                : null
              }
              <Route exact path='/' render={(props) => <Main updateAmount={ this.changeQuestionAmount } fetchQuiz={ this.fetchQuiz } switchHome={ this.switchHome }/>} />
              <Route path='/quiz' render={(props) => <Quiz amount={ this.state.questionAmount } answersArr={ this.answersArr } addAnswer={ this.addAnswer } quizArr={ this.state.quizArr } spawnPopup={ this.spawnPopup }/>} />
            </Router>
            <div className='fade__overlay'></div>
            { this.state.popup ? <Popup amount={ this.state.questionAmount } fetchQuiz={ this.fetchQuiz } correctCount={ this.state.correctCount } close={ this.spawnPopup } restart={ this.spawnPopupRestart }/> : null }
            <BeatLoader
              css={this.overrideCSS}
              size={30}
              color={"#7289da"}
              loading={this.state.loading}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
