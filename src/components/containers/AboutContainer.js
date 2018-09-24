import React, { Component } from 'react';

class AboutContainer extends Component {
  render(){
    return(
      <div className="container div--about-container">
        <h1>OBRA was created by <a href="https://mattzuzolo.github.io/">Matt Zuzolo</a>.</h1>
        <p>You can view the code on my <a href="https://www.github.com/mattzuzolo">GitHub page</a>, or directly at the <a href="https://github.com/mattzuzolo/obra">repository</a>.</p>
        <p className="source-credit">This project was made using data from <a href="https://www.harvardartmuseums.org/collections/api">The Harvard Museum API.</a></p>
      </div>
    );
  }
}

export default AboutContainer;
