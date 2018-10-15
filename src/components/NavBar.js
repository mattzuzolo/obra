import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserAction } from '../reducers/actions';

class NavBar extends Component {

  //clear loggedin redux state, remove token and push to login upon clicking logout
  logout = () => {
    this.props.loginUser({});
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }

  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item logo" to="/home">Obra</Link>
        <Link className="nav-item div--nav-bar-item" to="/artwork">Artwork</Link>
        <Link className="nav-item div--nav-bar-item" to="/annotations">Annotations</Link>

          {/*change NavBar options depending on if a user is logged in*/}
          { localStorage.getItem("token")
                    ?
                    <Fragment>
                      <button className="nav-item div--nav-bar-item nav-right button-logout" onClick={this.logout}>Logout</button>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/me">Profile</Link>
                    </Fragment>
                    :
                    <Fragment>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/register">Register</Link>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/login">Login</Link>
                    </Fragment>
          }
        <Link className="nav-item div--nav-bar-item nav-right" to="/about">About</Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
  }
}

function mapDispatchToProps(dispatch){
  return {
    loginUser: (user) => dispatch(loginUserAction(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
