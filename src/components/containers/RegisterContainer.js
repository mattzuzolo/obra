import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RegisterContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
    }
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  onRegisterSubmit = (event) => {
    event.preventDefault();

    let newUserPostBody = {
      email: this.state.email,
      password: this.state.password,
    }

    let newUserPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json"
       },
       body: JSON.stringify(newUserPostBody)
     };

    fetch("https://calm-atoll-79836.herokuapp.com/users", newUserPostConfig)
      .then(response => response.json())
      .then(this.props.history.push("/login"))
      .catch(error => {
        alert("Registration failed.")
      })
  }

  render(){
    return(
      <div className="container div--login-container">
        <h1 className="login-title">Register:</h1>
        <form className="form form--login" onSubmit={this.onRegisterSubmit}>
          <div className="login-form-elements">
            <label>Email:</label>
            <input className="input form--login-input" placeholder="email" name="email" value={this.state.email} onChange={this.onInputChange} ></input>
            <br/>
            <label>Password:</label>
            <input className="input form--login-input" placeholder="password" name="password" type="password" value={this.state.password} onChange={this.onInputChange} ></input>
            <br/>
            <button className="button button--login">Login</button>
          </div>
        </form>
        <p className="guest-credentials">Don't feel like registering? Visit the <Link to="/login">Login page</Link> to enter with guest credentials.</p>
      </div>
    )
  }
}

export default RegisterContainer
