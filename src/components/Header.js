import React from 'react';

//Components
import Hamburger from './Hamburger.js';

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <Hamburger toggleMenu={ this.props.toggleMenu }/>
        <h2>
          {
            this.props.page.home
              ? 'Home'
              : (this.props.page.about
                ? 'About'
                : (this.props.page.stats
                  ? 'Stats'
                  : 'Quiz'))
          }
        </h2>
      </div>
    );
  }
}

export default Header;
