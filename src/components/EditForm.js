import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      headline: this.props.selectedAnnotation.headline,
      sourceLink: this.props.selectedAnnotation.source,
      content: this.props.selectedAnnotation.content,
      xCoord: this.props.selectedAnnotation.xCoord,
      yCoord: this.props.selectedAnnotation.yCoord,
    }
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  render(){
    return(
      <div className="div div--full-annotation">
      <h1>Update your annotation:</h1>
        <form className="container div--edit-form" onSubmit={(event) => this.props.onAnnotationUpdateSubmit(event, this.state)}>
          <div className="edit-form-small-inputs">

            <label className="edit-form-label">X Coordinate:</label>
            <input className="edit-form-input-coord" value={this.state.xCoord}></input>
            <label className="edit-form-label">Y Coordinate:</label>
            <input className="edit-form-input-coord" value={this.state.yCoord}></input>
            <br/><br/>
            <label className="edit-form-label">Headline:</label>
            <br/>
            <input className="edit-form-input" placeholder="headline here" name="headline" value={this.state.headline} onChange={this.onInputChange} ></input>
            <br/>
            <label className="edit-form-label">Link:</label>
            <br/>
            <input className="edit-form-input" placeholder="source link here" name="sourceLink" value={this.state.sourceLink} onChange={this.onInputChange} ></input>
            <br/>
          </div>
            <label className="edit-form-label">Annotation:</label>
            <br/>
            <textarea className="edit-form-textarea" placeholder="share your annotation here" name="content" value={this.state.content} onChange={this.onInputChange} ></textarea>
            <br/>
            <button className="edit-form-button">Submit annotation</button>

        </form>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    selectedAnnotation: state.selectedAnnotation,
  }
}

export default connect(mapStateToProps)(EditForm);
