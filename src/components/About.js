import React from 'react';

class About extends React.Component {
  render() {
    return(
      <div className='About'>
        <h2>Lorem Impsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam aliquam tellus vel velit venenatis, rutrum efficitur urna pulvinar.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque vitae purus tristique, consectetur nulla at, facilisis diam.
          Donec quis sapien velit. Suspendisse non ligula vel mi imperdiet lacinia quis vitae leo.
          Vestibulum condimentum nulla non erat aliquam, nec tempus elit dignissim.
          Nam id dignissim dui. Donec metus lectus, eleifend ut tempor ac, feugiat vel est.
        </p>
        <p className='About__copyright'>Lorem Ipsum ©</p>
      </div>
    );
  }
}

export default About;
