import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtCard from "../ArtCard"

const artworkUrl = "https://calm-atoll-79836.herokuapp.com/artwork"

class ArtListContainer extends Component {

  //POST new work to /artwork
  postArtwork = () => {
    let artworkPostSubmissionBody = {
      title: this.props.selectedArtwork.title,
      artist: this.props.selectedArtwork.people[0].alphasort,
      medium: this.props.selectedArtwork.medium,
      century: this.props.selectedArtwork.century,
      culture: this.props.selectedArtwork.culture,
      url: this.props.selectedArtwork.url,
      primaryimageurl: this.props.selectedArtwork.primaryimageurl,
      id: this.props.selectedArtwork.id
    }

    let postArtworkConfig = {
      Accept: "application/json",
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(artworkPostSubmissionBody)
    }

    return fetch(artworkUrl, postArtworkConfig);
  }

  //Runs when user selects an artwork from the fetched list
  onClickArtwork = (event, selectedArtwork) => {
    //check to see if artwork exists in internal database
    fetch(`https://calm-atoll-79836.herokuapp.com/artwork/`)
      .then(response => response.json())
      .then(data => this.findArtworkById(data.artwork, selectedArtwork))
      .then(foundWork => {
        //if artwork is found, swap for interal version and send user to detail
        if(foundWork){
          this.props.routerProps.history.push(`/artwork/${foundWork.id}`)
          return this.props.selectArtwork(foundWork);
        }
        //if not found, save to internal database and send user to detail
        else {
          this.props.selectArtwork(selectedArtwork);
          this.postArtwork()
            .then(response => response.json())
            .then(newArtwork => this.props.routerProps.history.push(`/artwork/${newArtwork.id}`))
        }
      })
      .catch(console.error)
  }

  //checks to see if artwork exists interally
  findArtworkById = (fetchedArray, selectedArtwork) => {
    return fetchedArray.find(individualArtwork => individualArtwork.id === parseInt(selectedArtwork.id, 10))
  }

  render(){
    return(
      <div className="container div--art-list-container">
        {this.props.artworkArray.map(individualCard => (
          <ArtCard
            className="artList"
            artwork={individualCard}
            key={individualCard.id}
            id={individualCard.id}
            title={individualCard.title}
            artist={individualCard.artist}
            medium={individualCard.medium}
            sourceLink={individualCard.url}
            culture={individualCard.culture}
            primaryimageurl={individualCard.primaryimageurl}
            onClickArtwork={this.onClickArtwork}
          />
        ))}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (artworkArray => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: artworkArray})
    }),
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ArtListContainer);
