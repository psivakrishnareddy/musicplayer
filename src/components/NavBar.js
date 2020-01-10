import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./styles.css";
import { connect } from "react-redux";
import {
  setLoginLoading,
  setLoginSuccess,
  setLoginError
} from "../redux/login/loginActions";
import {
  showSongsPlaylistQueue,
  setIsplayingPause,
  deleteSongPlaylist,
  AddSongMainSongsQueue,
  clearMainSongsQueue,
  setAlbumToMainSongsQueue
} from "../redux/musiccontent/musicActions";
import { showFavSongs } from "../redux/favourites/favActions";
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  render() {
    // console.log(this.props.showSongsQueue, "in navbar Quw");
    return (
      <nav>
        <div>
          <i
            className="fa fa-spotify"
            style={{ color: "#4caf50", fontSize: "40px" }}
          />
          SKR Media Player
        </div>
        <div className="links">
          Codingmart
          <i
            onClick={() => {
              this.props.showSongsPlaylistQueue(!this.props.showSongsQueue);
              this.props.showFavSongs(false);
            }}
            style={{
              marginLeft: "30px",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "10%",
              cursor: "pointer"
            }}
            className="fa fa-play"
          />
          <i
            onClick={() => {
              this.props.showFavSongs(!this.props.showFavList);
              this.props.showSongsPlaylistQueue(false);
            }}
            style={{
              marginLeft: "30px",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "10%",
              cursor: "pointer"
            }}
            className="fa fa-heart"
          />
        </div>
        <div>
          <i
            onClick={() => this.props.clearMainSongsQueue()}
            style={{
              marginLeft: "30px",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "10%",
              cursor: "pointer"
            }}
            className="fa fa-trash"
          />
        </div>
        <div>
          <button
            style={{ border: "1px solid green", cursor: "pointer" }}
            onClick={this.handleSignOut}
          >
            SignOut
          </button>
        </div>
      </nav>
    );
  }
  handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out Succesfully");
        this.props.setLoginSuccess(false);
        this.props.setLoginError(null);
      })
      .catch(error => {
        console.log("Error Loging User...", error);
      });
  }
}

const mapStateToProps = state => {
  // console.log("state", state);
  return {
    isLoginLoading: state.Login.isLoginLoading,
    isLoginSuccess: state.Login.isLoginSuccess,
    LoginError: state.Login.LoginError,
    playlistIsPlaying: state.music.playlistIsPlaying,
    currentSongIndex: state.music.currentSongIndex,
    showSongsQueue: state.music.showSongsQueue,
    mainSongsQueue: state.music.mainSongsQueue,
    showFavList: state.favs.showFavList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoginLoading: isLoginLoading =>
      dispatch(setLoginLoading(isLoginLoading)),
    setLoginSuccess: isLoginSuccess =>
      dispatch(setLoginSuccess(isLoginSuccess)),
    setLoginError: LoginError => dispatch(setLoginError(LoginError)),
    showSongsPlaylistQueue: showQue =>
      dispatch(showSongsPlaylistQueue(showQue)),
    setIsplayingPause: () => dispatch(setIsplayingPause()),
    deleteSongPlaylist: songNameItem =>
      dispatch(deleteSongPlaylist(songNameItem)),
    setAlbumToMainSongsQueue: playlist =>
      dispatch(setAlbumToMainSongsQueue(playlist)),
    AddSongMainSongsQueue: song => dispatch(AddSongMainSongsQueue(song)),
    clearMainSongsQueue: () => dispatch(clearMainSongsQueue()),
    showFavSongs: showFav => dispatch(showFavSongs(showFav))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
