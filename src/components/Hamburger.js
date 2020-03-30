import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import MenuIconOpen from '@material-ui/icons/MenuOpen';
import Button from '@material-ui/core/Button';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);

    this.state = { menu: false };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if(this.state.menu) {
      this.setState({ menu: false });
    }else {
      this.setState({ menu: true });
    }
    
    this.props.toggleMenu();
  }

  render() {
    return(
      <Button onClick={ this.onClick } className='Button'>
        { this.state.menu
            ? <MenuIconOpen size='large' className='Hamburger'/>
            : <MenuIcon size='large' className='Hamburger'/>
        }
      </Button>
    );
  }
}

export default Hamburger;
