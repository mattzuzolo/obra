import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtListContainer from "./ArtListContainer"

const querystring = require('querystring')



class IndexContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        activeQuery: "",
      }
    }

  componentDidMount(){
    fetch("https://calm-atoll-79836.herokuapp.com/artwork")
      .then(response => response.json())
      .then(data => this.props.updateArtworkArray(data.artwork))
      .catch(console.error);
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  //this method filters out artwork from API without an image link
  filterForImageLinkPresent = (data) => {
    return data.filter(individualWork => individualWork.primaryimageurl !== null )
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    //Grabs the query from state to send to external API
    let submittedQuery = this.state.activeQuery;
    var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    let searchString = querystring.stringify({
      apikey: "0eec8470-9658-11e8-90a5-d90dedc085a2",
      title: submittedQuery,
      classification: "Paintings"
    })

    //Fetch external data --> filter out response data with no image link --> save to redux array for display later on
    fetch(apiEndpointBaseURL + "?" + searchString)
      .then(response => response.json())
      .then(data => this.filterForImageLinkPresent(data.records))
      .then(dataArray => this.props.updateArtworkArray(dataArray))
      .catch(console.error);
  }

  render(){
    return(
      <div className="container div--index-container">
        <form className="form form--index" onSubmit={this.handleFormSubmit}>
          <input placeholder="Search" value={this.state.activeQuery} onChange={this.onQueryChange} ></input>
          <button>Submit</button>
        </form>

        <ArtListContainer routerProps={this.props.routerProps} localArtworkArray={this.state.localArtworkArray} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (dataArray) => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: dataArray})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
