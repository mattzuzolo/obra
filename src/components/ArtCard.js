import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ArtCard extends Component {
  render(){
    return(
      <div onClick={(event) => this.props.onClickArtwork (event, this.props.artwork)} className="div--art-card">
        <img src={this.props.imageUrl} alt="thumbail"></img>
        <h1>{this.props.title}</h1>
        <h3>{this.props.artist}</h3>
      </div>
    );
  }
}

export default ArtCard;

 // onClick={(event) => this.props.onClickArtwork (event, this.props.artwork)}
