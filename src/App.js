import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import NavBar from "./components/NavBar"
import IndexContainer from "./components/containers/IndexContainer";
import DetailContainer from "./components/containers/DetailContainer";
import LoginContainer from "./components/containers/LoginContainer";
import HomeContainer from "./components/containers/HomeContainer";
import AnnotationContainer from "./components/containers/AnnotationContainer";
import AboutContainer from "./components/containers/AboutContainer";
import RegisterContainer from "./components/containers/RegisterContainer";
import ProfileContainer from "./components/containers/ProfileContainer";


class App extends Component {

  //Check token to see identity of current user
  componentDidMount(){
    let token = localStorage.getItem("token");
    if(!!token){
      fetch("https://calm-atoll-79836.herokuapp.com/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth": localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(foundUser => this.props.loginUser(foundUser.user))
        .catch(error => {
          //Remove token and send user to Login if token is not found
          localStorage.removeItem("token");
          this.props.history.push("/login");
        })
    }
  }

  render() {
    return (
      <div className="container div--app App">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps} />}/>
          <Switch>
            <Route path ={`/artwork/:id`} render={(routerProps) => {
                let paramsId = routerProps.match.params.id;
                return <DetailContainer routerProps={routerProps} paramsId={paramsId}/>
              }} />
            <Route path="/artwork" render={(routerProps) => <IndexContainer
              routerProps={routerProps} />}/>
            <Route path="/home" render={(routerProps) => <HomeContainer
              routerProps={routerProps} />}/>
            <Route path="/annotations" render={(routerProps) => <AnnotationContainer
              routerProps={routerProps} />}/>
            <Route path="/about" component={AboutContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" render={(routerProps) => <RegisterContainer
              {...routerProps} />}/>
            <Route path="/me" render={(routerProps) => <ProfileContainer
              routerProps={routerProps} />}/>
          </Switch>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    loginUser: (user => {
      dispatch({type: "LOGIN_USER", payload: user})
    }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
