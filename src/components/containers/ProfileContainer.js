import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationListItem from "../AnnotationListItem";

const myAnnotationsUrl = "http://localhost:4000/me/annotations"

class ProfileContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      myAnnotationArray: [],
    }
  }

  componentDidMount(){
    fetch(myAnnotationsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => this.setState({myAnnotationArray: data.annotations}))
    .catch(error => {
      if(localStorage.getItem("token")){
        this.props.history.push("/login");
        alert("You must be logged in to view this page");
      } else {
        this.setState({myAnnotationArray: []})
        alert("Sorry! Cannot access annotations right now")
      }

    })
  }

  onClickAnnotation = (event, selectedArtwork) => {
    this.props.routerProps.history.push(`/artwork/${selectedArtwork.id}`)
    return this.props.selectArtwork(selectedArtwork);
  }

  getNameFromEmail = (emailAddress) => {
    if(emailAddress){
      let name = emailAddress.split("@");
      return name[0];
    }
    return emailAddress
  }

  render(){
    return(
      <div className="container div--profile-container">
        <h1>Welcome to Obra, {this.getNameFromEmail(this.props.loggedInUser.email)}.</h1>
        <p><span style={{ fontWeight: 'bold' }}>Your email:</span> {this.props.loggedInUser.email}</p>

          { this.state.myAnnotationArray.length > 0
                    ? <h1>Your annotations:</h1>
                    : <h1>You haven't made any annotations!</h1>
          }



          {this.state.myAnnotationArray.map(individualAnnotation => (
            <AnnotationListItem
              key={individualAnnotation._id}
              individualAnnotation={individualAnnotation}
              onClickAnnotation={this.onClickAnnotation}
            />
          ))}

      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
