import React from 'react';

//Components
import Button from '@material-ui/core/Button';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.overlay = React.createRef();
    this.menu = React.createRef();
    this.homeBtn = React.createRef();

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickAbout = this.onClickAbout.bind(this);
    this.onClickStats = this.onClickStats.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.focusHome = this.focusHome.bind(this);
    this.onClickOverlay = this.onClickOverlay.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClickHome() {
    if(this.props.home) {
      this.props.closeMenu();
    }else {
      this.props.goHome();
      this.props.closeMenu();
    }
  }

  onClickAbout() {
    if(this.props.about) {
      this.props.closeMenu();
    }else {
      this.props.goAbout();
      this.props.closeMenu();
    }
  }

  onClickStats() {
    if(this.props.stats) {
      this.props.closeMenu();
    }else {
      this.props.goStats();
      this.props.closeMenu();
    }
  }

  onClickOverlay(e) {
    if(e.target === this.overlay.current) {
      this.props.closeMenu();
    }
  }

  onFocus() {
    this.menu.current.classList.add('Menu__visible__border');
  }

  focusHome() {
    this.homeBtn.current.focus();
  }

  onBlur() {
    this.menu.current.classList.remove('Menu__visible__border');
  }

  onMouseEnter(e) {
    if(e.target === this.overlay.current && this.props.showMenu) {
      this.menu.current.classList.add('Menu__visible__border');
    }
  }

  onMouseLeave(e) {
    if(e.target === this.overlay.current) {
      this.menu.current.classList.remove('Menu__visible__border');
    }
  }



  render() {
    return (
      <>
        <div onMouseOver={ this.onMouseEnter} onMouseOut={ this.onMouseLeave } ref={ this.overlay }onClick={ this.onClickOverlay } className={ this.props.showMenu ? 'Menu__overlay' : 'Menu__overlay__hidden'}>
          <div ref={ this.menu } className={ this.props.showMenu ? 'Menu__visible' : 'Menu__hidden' }>
            <Button ref={ this.homeBtn } onClick={ this.onClickHome } className='Button'>Home screen</Button>
            <Button onClick={ this.onClickStats } className='Button'>Stats</Button>
            <Button onClick={ this.onClickAbout } className='Button'>About this app</Button>
          </div>
        </div>
        { this.props.showMenu ? <button aria-label='closeMenu' onBlur={ this.onBlur } onFocus={ this.onFocus } onClick={ this.props.closeMenu } className='hidden__button'></button> : null }
      </>
  );
  }
}

export default Menu;
