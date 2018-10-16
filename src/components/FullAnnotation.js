import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


class FullAnnotation extends Component {

  render(){
    return(
      <div className="div div--full-annotation">
        <h1>{this.props.selectedAnnotation.headline}</h1>
        <p>{this.props.selectedAnnotation.content}</p>
        <p>Source: <a href={this.props.selectedAnnotation.source}>{this.props.selectedAnnotation.source}</a></p>

          { (this.props.selectedAnnotation.user[0]._id == this.props.loggedInUser._id)
                    ?
                    <Fragment>
                      <button className="button button--annotation-card button--annotation-card-update" onClick={(event) => this.props.onAnnotationUpdateFormDisplay(event)} >Update Annotation</button>
                      <button className="button button--annotation-card button--annotation-card-delete" onClick={(event) => this.props.onAnnotationCardDelete(event, this.props.selectedAnnotation)} >Delete Annotation</button>
                    </Fragment>
                    : null
          }

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

export default connect(mapStateToProps)(FullAnnotation);
