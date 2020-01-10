import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import {
  setLoginLoading,
  setLoginSuccess,
  setLoginError
} from "../../redux/login/loginActions";
import "./loginstyle.css";
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.HandleonSubmit = this.HandleonSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  // componentDidMount() {
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyDr87dvmSpbxtILs8jeREJWkPPrOsgs-2o",
  //     authDomain: "mediaplayer-64e1d.firebaseapp.com",
  //     databaseURL: "https://mediaplayer-64e1d.firebaseio.com",
  //     projectId: "mediaplayer-64e1d",
  //     storageBucket: "mediaplayer-64e1d.appspot.com",
  //     messagingSenderId: "868298162811",
  //     appId: "1:868298162811:web:4ebc9082d04aeccec158de"
  //   });
  //   console.log("Firebase Inititalized...");
  // }

  HandleonSubmit(e) {
    // this.setState({ loading: true });
    this.props.setLoginLoading(true);
    let { username, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(data => {
        // this.setState({ loading: false, isloginSuccess: true });
        this.props.setLoginLoading(false);
        this.props.setLoginSuccess(true);

        console.log("successfull Login..", data);
      })
      .catch(error => {
        // this.setState({ loading: false, isloginError: true });
        this.props.setLoginLoading(false);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.props.setLoginError(error.message);
        this.props.setLoginSuccess(false);
        console.log(errorCode, errorMessage);
        // ...
      });
    console.log("Submitted..Data==>", this.state.username, this.state.password);
    this.setState({ username: "", password: "" });
    e.preventDefault();
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
    this.props.setLoginError(null);
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
    this.props.setLoginError(null);
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <div></div>
          <div>Login</div>
          <div></div>
        </nav>
        <div className="login-user-details">
          <form name="loginForm" onSubmit={this.HandleonSubmit}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              name="username"
            ></input>
            <br />
            <label htmlFor="password">PASSWORD</label>

            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              name="password"
            ></input>
            <br />
            <button type="submit">Login</button>
          </form>
          <div className="myloader">
            {this.props.isLoginLoading ? (
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {this.props.LoginError !== null ? (
            <p style={{ color: "red" }}>{this.props.LoginError}</p>
          ) : (
            <div />
          )}

          {this.props.isLoginSuccess ? (
            <p style={{ color: "green" }}>SuccessFull Login..</p>
          ) : (
            <div />
          )}
        </div>

        <br />

        {console.log(this.props.isLoginLoading, "loading Variable")}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginLoading: state.Login.isLoginLoading,
    isLoginSuccess: state.Login.isLoginSuccess,
    LoginError: state.Login.LoginError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoginLoading: isLoginLoading =>
      dispatch(setLoginLoading(isLoginLoading)),
    setLoginSuccess: isLoginSuccess =>
      dispatch(setLoginSuccess(isLoginSuccess)),
    setLoginError: LoginError => dispatch(setLoginError(LoginError))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
