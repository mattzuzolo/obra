import React, { Component } from 'react';

class AnnotationListItem extends Component {

  truncateString = (string) => {
    if (string.length > 140){
      let shortenedString = string.substring(0, 140)
      let shortenedStringWithFullWords = shortenedString.substr(0, shortenedString.lastIndexOf(" "));
      return shortenedStringWithFullWords + "...";
    }
  }

  render(){
    return(
        <div onClick={(event) => this.props.onClickAnnotation(event, this.props.individualAnnotation, this.props.individualAnnotation.artwork[0])} className="div--annotation-list-item">

        <div className="div--annotation-list-item-left">
          <img src={this.props.individualAnnotation.artwork[0].primaryimageurl} alt="thumbail"></img>
        </div>

        <div className="div--annotation-list-item-right">

          <div className="div--annotation-artwork-info-container">
            <h1 className="annotation-list-item-header">Artwork:</h1>
            <h3 className="h3 annotation-list-item-title">{this.props.individualAnnotation.artwork[0].title}</h3>
            <h4 className="h4 h4-annotation-list-item-title">{this.props.individualAnnotation.artwork[0].artist}</h4>
            <p className="p source-credit annotation-list-item-detail detail-source"><text style={{ fontWeight: 'bold' }}>Source:</text> <a href={this.props.url}>Harvard Art Museums</a> </p>
          </div>

          <div>
            <h1 className="annotation-list-item-header">Annotation:</h1>
            <h3 className="h3 annotation-list-item-title"> {this.props.individualAnnotation.headline}</h3>
            <h3 className="h3 annotation-list-item-content"> {this.truncateString(this.props.individualAnnotation.content)}</h3>
          </div>
        </div>
      </div>
    );
  }

}

export default AnnotationListItem
