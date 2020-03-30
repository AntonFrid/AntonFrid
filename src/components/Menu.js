import React from 'react';
import FocusTrap from 'focus-trap-react';

//Components
import Button from '@material-ui/core/Button';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if(this.props.home) {
      this.props.closeMenu()
    }else {
      this.props.goHome()
      this.props.closeMenu()
    }
  }


  render() {
    return (
      <div className={ this.props.showMenu ? 'Menu__overlay' : 'Menu__overlay__hidden'}>
        <div className={ this.props.showMenu ? 'Menu__visible' : 'Menu__hidden' }>
          <Button onClick={ this.onClick } className='Button'>Home screen</Button>
          <Button className='Button'>Stats</Button>
          <Button className='Button'>About this app</Button>
        </div>
      </div>
    );
  }
}

export default Menu;
