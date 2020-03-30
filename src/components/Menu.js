import React from 'react';

//Components
import Button from '@material-ui/core/Button';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.focusHome = this.focusHome.bind(this);
    this.onClickOverlay = this.onClickOverlay.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick() {
    if(this.props.home) {
      this.props.closeMenu()
    }else {
      this.props.goHome()
      this.props.closeMenu()
    }
  }

  onClickOverlay(e) {
    if(e.target === this.refs.overlay) {
      this.props.closeMenu();
    }
  }

  onFocus() {
    this.refs.menu.classList.add('Menu__visible__border');
  }

  focusHome() {
    this.refs.homeBtn.focus();
  }

  onBlur() {
    this.refs.menu.classList.remove('Menu__visible__border');
  }

  onMouseEnter(e) {
    if(e.target === this.refs.overlay) {
      this.refs.menu.classList.add('Menu__visible__border');
    }
  }

  onMouseLeave(e) {
    if(e.target === this.refs.overlay) {
      this.refs.menu.classList.remove('Menu__visible__border');
    }
  }



  render() {
    return (
      <>
        <div onMouseOver={ this.onMouseEnter} onMouseOut={ this.onMouseLeave } ref='overlay' onClick={ this.onClickOverlay } className={ this.props.showMenu ? 'Menu__overlay' : 'Menu__overlay__hidden'}>
          <div ref='menu' className={ this.props.showMenu ? 'Menu__visible' : 'Menu__hidden' }>
            <Button ref='homeBtn' onClick={ this.onClick } className='Button'>Home screen</Button>
            <Button className='Button'>Stats</Button>
            <Button className='Button'>About this app</Button>
          </div>
        </div>
        { this.props.showMenu ? <button onBlur={ this.onBlur } onFocus={ this.onFocus } onClick={ this.props.closeMenu } className='hidden__button'></button> : null }
      </>
  );
  }
}

export default Menu;
