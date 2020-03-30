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
            this.props.page.menu
              ? 'Menu'
              : (this.props.page.home
                ? 'Home'
                : (this.props.page.stats
                  ? 'Stats'
                  : ( this.props.page.about
                    ? 'About' : 'Quiz')))
          }
        </h2>
      </div>
    );
  }
}

export default Header;
