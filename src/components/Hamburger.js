import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import MenuIconOpen from '@material-ui/icons/MenuOpen';
import Button from '@material-ui/core/Button';

class Hamburger extends React.Component {
  render() {
    return(
      <Button aria-label='menu' onClick={ this.props.toggleMenu } className='Button'>
        { this.props.menuBool
            ? <MenuIconOpen size='large' className='Hamburger'/>
            : <MenuIcon size='large' className='Hamburger'/>
        }
      </Button>
    );
  }
}

export default Hamburger;
