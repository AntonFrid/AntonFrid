import React from 'react';

//Components
import Hamburger from './Hamburger.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Header'>
        <Hamburger toggleMenu={ this.props.toggleMenu }/>
      </div>
    );
  }
}

export default Header;
