import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectArtworkAction, selectAnnotationAction } from '../../reducers/actions';

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

  onClickAnnotation = (event, selectAnnotation, selectArtwork) => {
    console.log("SELECTED artwork", selectAnnotation)
    this.props.selectAnnotation(selectAnnotation)
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

function mapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork,
    selectedAnnotation: state.selectedAnnotation,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => dispatch(selectArtworkAction(chosenArtwork)),
    selectAnnotation: (chosenAnnotation) => dispatch(selectAnnotationAction(chosenAnnotation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationContainer);
