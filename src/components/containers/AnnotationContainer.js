import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationListItem from "../AnnotationListItem"

//This url provides access to annotations with full artwork objects
const annotationWithArtworkUrl = "https://calm-atoll-79836.herokuapp.com/annotations-artwork";

class AnnotationContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        activeQuery: "",
        fetchedAnnotations: [],
      }
    }

  componentDidMount(){
    fetch(annotationWithArtworkUrl)
      .then(response => response.json())
      .then(data => this.setState({fetchedAnnotations: data.annotation}))
      .catch(console.error)
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  onClickAnnotation = (event, selectedAnnotation, selectArtwork) => {
    console.log("SELECTED artwork", selectedAnnotation)
    this.props.selectedAnnotation(selectedAnnotation)
    this.props.selectArtwork(selectArtwork)
    this.props.routerProps.history.push(`/artwork/${selectArtwork.id}`)
    // return ;
  }

  render(){
    return(
      <div className="container div--index-container">
        {this.state.fetchedAnnotations.map(individualAnnotation => (
          <AnnotationListItem
            key={individualAnnotation._id}
            individualAnnotation={individualAnnotation}
            onClickAnnotation={this.onClickAnnotation}
          />
        ))}
      </div>
    );
  }
}

//comment
function mapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork,
    selectedAnnotation: state.selectedAnnotation,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    },
    selectedAnnotation: (chosenAnnotation => {
      dispatch({type: "SELECT_ANNOTATION", payload: chosenAnnotation})
    }),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AnnotationContainer);
