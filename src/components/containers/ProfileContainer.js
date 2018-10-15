import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectArtworkAction, selectAnnotationAction } from '../../reducers/actions';


import AnnotationListItem from "../AnnotationListItem";

const myAnnotationsUrl = "https://calm-atoll-79836.herokuapp.com/me/annotations"

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

  onClickAnnotation = (event, selectAnnotation, selectArtwork) => {
    // console.log("selectAnnotation", selectAnnotation)
    this.props.selectAnnotation(selectAnnotation);
    this.props.selectArtwork(selectArtwork);
    this.props.routerProps.history.push(`/artwork/${selectArtwork.id}`)
    //return;
  }

  getNameFromEmail = (emailAddress) => {
    if(emailAddress){
      let name = emailAddress.split("@");
      return name[0];
    }
    return emailAddress
  }

  render(){
    console.log("REDUX PROPS", this.props)
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
    selectArtwork: state.selectedArtwork,
    selectAnnotation: state.selectAnnotation,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => dispatch(selectArtworkAction(chosenArtwork)),
    selectAnnotation: (chosenAnnotation) => dispatch(selectAnnotationAction(chosenAnnotation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
