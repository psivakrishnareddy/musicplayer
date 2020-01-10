import React, { Component } from "react";
import Main from "./components/main";
import Navbar from "./components/NavBar";
import "./App.css";
import Player from "./components/Player";
import LoginPage from "./components/loginScreen/LoginPage";
import { connect } from "react-redux";
import {
  setLoginLoading,
  setLoginSuccess,
  setLoginError
} from "./redux/login/loginActions";
import {
  updatePlaylist,
  nextSongPlaylist,
  showSongsPlaylistQueue,
  setIsplayingPause,
  deleteSongPlaylist,
  AddSongMainSongsQueue,
  clearMainSongsQueue,
  setCurrentSongPlaying
} from "./redux/musiccontent/musicActions";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { setAlbumToMainSongsQueue } from "./redux/musiccontent/musicActions";
// import store from "./redux/store";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // playlist: null,
      // playlistIsPlaying: false,
      // currentSongIndex: 0,
      // showSongsQueue: false,
      // mainSongsQueue: [],
      // currentSongPlaying: ""
      // set to null later
    };
    // this.updatePlaylist = this.updatePlaylist.bind(this);
    // this.nextSongPlaylist = this.nextSongPlaylist.bind(this);
    // this.showSongsPlaylistQueue = this.showSongsPlaylistQueue.bind(this);
    // this.setIsplayingPause = this.setIsplayingPause.bind(this);
    // this.deleteSongPlaylist = this.deleteSongPlaylist.bind(this);
    // this.AddSongMainSongsQueue = this.AddSongMainSongsQueue.bind(this);
    // this.setAlbumToMainSongsQueue = this.setAlbumToMainSongsQueue.bind(this);
    // this.clearMainSongsQueue = this.clearMainSongsQueue.bind(this);
    // this.setCurrentSongPlaying = this.setCurrentSongPlaying.bind(this);
  }

  async componentDidMount() {
    await firebase.initializeApp({
      apiKey: "AIzaSyDr87dvmSpbxtILs8jeREJWkPPrOsgs-2o",
      authDomain: "mediaplayer-64e1d.firebaseapp.com",
      databaseURL: "https://mediaplayer-64e1d.firebaseio.com",
      projectId: "mediaplayer-64e1d",
      storageBucket: "mediaplayer-64e1d.appspot.com",
      messagingSenderId: "868298162811",
      appId: "1:868298162811:web:4ebc9082d04aeccec158de"
    });
    console.log("Firebase Inititalized...");
  }

  componentDidUpdate() {
    // console.log(
    //   this.state.mainSongsQueue,
    //   "This is Main Playlist ",
    //   "current song :",
    //   this.state.currentSongPlaying
    // );
  }
  render() {
    return (
      <React.Fragment>
        {!this.props.isLoginSuccess ? (
          <LoginPage />
        ) : (
          <div className="react-media-section">
            <Navbar
            // clearMainSongsQueue={this.clearMainSongsQueue}
            // showSongsQueue={this.state.showSongsQueue}
            // showSongsPlaylistQueue={this.showSongsPlaylistQueue}
            />

            <Main
            // setAlbumToMainSongsQueue={this.setAlbumToMainSongsQueue}
            // mainSongsQueue={this.state.mainSongsQueue}
            // showSongsQueue={this.state.showSongsQueue}
            // updatePlaylist={this.updatePlaylist}
            // currentSongIndex={this.state.currentSongIndex}
            // playlist={this.state.playlist}
            // playlistIsPlaying={this.state.playlistIsPlaying}
            // AddSongMainSongsQueue={this.AddSongMainSongsQueue}
            // setCurrentSongPlaying={this.setCurrentSongPlaying}
            // deleteSongPlaylist={this.deleteSongPlaylist}
            // currentSongPlaying={this.state.currentSongPlaying}
            />
            <Player
            // nextSongPlaylist={this.nextSongPlaylist}
            // playlistIsPlaying={this.state.playlistIsPlaying}
            // currentSongIndex={this.state.currentSongIndex}
            // playlist={this.state.playlist}
            // setIsplayingPause={this.setIsplayingPause}
            // mainSongsQueue={this.state.mainSongsQueue}
            // currentSongPlaying={this.state.currentSongPlaying}
            // setCurrentSongPlaying={this.setCurrentSongPlaying}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  // updatePlaylist(playlist, currentSongIndex) {
  //   this.setState({ currentSongPlaying: playlist[currentSongIndex] });
  //   playlist = playlist.map(song => song.src);

  //   if (Number.isInteger(currentSongIndex)) {
  //     // Changes state of Playlist if user selects other album

  //     if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist)) {
  //       this.setState({
  //         playlist: playlist,
  //         playlistIsPlaying: true,
  //         currentSongIndex: currentSongIndex
  //       });
  //     } else
  //       this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying });
  //     // if not new playlist toggle play and pause
  //     // if different soong is clickeds
  //     if (currentSongIndex !== this.state.currentSongIndex)
  //       this.setState({
  //         currentSongIndex,
  //         playlistIsPlaying: true,
  //         currentSongPlaying: playlist[currentSongIndex]
  //       });
  //   } else {
  //     // if Just a Album is clicked and song is not selected CI is undefined
  //     if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist))
  //       this.setState({
  //         playlist,
  //         playlistIsPlaying: true,
  //         currentSongIndex: 0,
  //         currentSongPlaying: playlist[0]
  //       });
  //     else this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying });
  //   }

  //   // console.log(playlist, "Selected playlist");
  //   // console.log(playlist[currentSongIndex], "selected Song");
  // }

  // nextSongPlaylist(playlist, currentSongIndex) {
  //   // playlist = playlist.map(song => song.src);
  //   if (Number.isInteger(currentSongIndex)) {
  //     // Changes state of Playlist if user selects other album

  //     if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist)) {
  //       this.setState({
  //         playlist: playlist,
  //         playlistIsPlaying: true,
  //         currentSongIndex: currentSongIndex,
  //         currentSongPlaying: playlist[currentSongIndex]

  //         // mainSongsQueue: [...this.state.mainSongsQueue, playlist]
  //       });
  //     } else
  //       this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying });
  //     // if not new playlist toggle play and pause
  //     // if different soong is clickeds
  //     if (currentSongIndex !== this.state.currentSongIndex)
  //       this.setState({
  //         currentSongIndex,
  //         playlistIsPlaying: true,
  //         currentSongPlaying: playlist[currentSongIndex]
  //       });
  //   } else {
  //     // if Just a Album is clicked and song is not selected CI is undefined
  //     if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist))
  //       this.setState({
  //         playlist,
  //         playlistIsPlaying: true,
  //         currentSongIndex: 0,
  //         currentSongPlaying: playlist[0]
  //       });
  //     else this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying });
  //   }

  //   // console.log(playlist, "Selected playlist");
  //   console.log(
  //     this.state.currentSongPlaying,
  //     "<<<<<<<the current Song Playing in Nextplay"
  //   );
  //   // console.log(playlist[currentSongIndex], "selected Song");
  // }
  // showSongsPlaylistQueue(showQue) {
  //   this.setState({ showSongsQueue: showQue });
  //   // console.log(this.state.showSongsQueue, "Playlist Queue");
  // }
  // setIsplayingPause() {
  //   this.setState({ playlistIsPlaying: false });
  // }

  // deleteSongPlaylist(songNameItem) {
  //   let SongsQueue = this.state.mainSongsQueue;
  //   this.state.mainSongsQueue.forEach((song, index) => {
  //     if (song.name === songNameItem) {
  //       SongsQueue.splice(index, 1);
  //     }
  //   });
  //   this.setState({ mainSongsQueue: SongsQueue });
  // }

  // setAlbumToMainSongsQueue(playlist) {
  //   let queue = this.state.mainSongsQueue;
  //   playlist.forEach(playlistItem => {
  //     if (this.state.mainSongsQueue.indexOf(playlistItem) === -1) {
  //       queue.push(playlistItem);
  //     }
  //   });

  //   this.setState({ mainSongsQueue: queue });
  // }

  // AddSongMainSongsQueue(song) {
  //   if (this.state.mainSongsQueue.indexOf(song) === -1) {
  //     this.setState({
  //       mainSongsQueue: [...this.state.mainSongsQueue, song]
  //     });
  //   }
  // } // console.log(playlist, "Selected playlist");
  // // console.log(playlist[currentSongIndex], "selected Song");

  // clearMainSongsQueue() {
  //   this.setState({ mainSongsQueue: [], playlist: [], currentSongPlaying: "" });
  // }

  // setCurrentSongPlaying(song) {
  //   this.setState({ currentSongPlaying: song });
  //   console.log("Current Song..", this.state.currentSongPlaying);
  // }
}

const mapStateToProps = state => {
  return {
    isLoginLoading: state.Login.isLoginLoading,
    isLoginSuccess: state.Login.isLoginSuccess,
    LoginError: state.Login.LoginError,
    playlist: state.music.playlist,
    playlistIsPlaying: state.music.playlistIsPlaying,
    currentSongIndex: state.music.currentSongIndex,
    showSongsQueue: state.music.showSongsQueue,
    mainSongsQueue: state.music.mainSongsQueue,
    currentSongPlaying: state.music.currentSongPlaying
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoginLoading: isLoginLoading =>
      dispatch(setLoginLoading(isLoginLoading)),
    setLoginSuccess: isLoginSuccess =>
      dispatch(setLoginSuccess(isLoginSuccess)),
    setLoginError: LoginError => dispatch(setLoginError(LoginError)),
    updatePlaylist: (playlist, currentSongIndex) =>
      dispatch(updatePlaylist(playlist, currentSongIndex)),
    nextSongPlaylist: (playlist, currentSongIndex) =>
      dispatch(nextSongPlaylist(playlist, currentSongIndex)),
    showSongsPlaylistQueue: showQue =>
      dispatch(showSongsPlaylistQueue(showQue)),
    setIsplayingPause: () => dispatch(setIsplayingPause()),
    deleteSongPlaylist: songNameItem =>
      dispatch(deleteSongPlaylist(songNameItem)),
    setAlbumToMainSongsQueue: playlist =>
      dispatch(setAlbumToMainSongsQueue(playlist)),
    AddSongMainSongsQueue: song => dispatch(AddSongMainSongsQueue(song)),
    clearMainSongsQueue: () => dispatch(clearMainSongsQueue()),
    setCurrentSongPlaying: song => dispatch(setCurrentSongPlaying(song))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
