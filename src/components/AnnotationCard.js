import React, { Component } from 'react';
import { connect } from 'react-redux';


class AnnotationCard extends Component {

  truncateString = (string) => {
    if (string.length > 140){
      let shortenedString = string.substring(0, 140)
      let shortenedStringWithFullWords = shortenedString.substr(0, shortenedString.lastIndexOf(" "));
      return shortenedStringWithFullWords + "...";
    }
    return string;
  }

  getNameFromEmail = (emailAddress) => {
    if(emailAddress === this.props.loggedInUser.email){
      return "YOU";
    }
    else if (emailAddress){
      let name = emailAddress.split("@");
      return name[0];
    }
    else {
      return emailAddress;
    }
  }

  render(){

    let borderStyle = {};
    if (this.props.selectedAnnotation._id === this.props.annotation._id){
      borderStyle = {
        "borderStyle": "solid",
        "borderWidth": "2.5px",
        "borderColor": "#39ff14",
      }
    }

    // console.log("PROPS IN ANNOTATION CARD", this.props.annotation)

    return(
      <div onClick={(event) => this.props.onAnnotationCardClick(event, this.props.annotation)} className="div--annotation-card" style={borderStyle}>
        <h1>{this.props.headline}</h1>
        <p><a href={this.props.source}>{this.props.source}</a></p>
        <p>{this.truncateString(this.props.content)}</p>
        <p className="annotation-creator">Creator: {this.getNameFromEmail(this.props.creator)}</p>
        <br />


      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
    selectedAnnotation: state.selectedAnnotation,
  }
}

export default connect(mapStateToProps)(AnnotationCard);
