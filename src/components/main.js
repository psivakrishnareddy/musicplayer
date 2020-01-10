import React, { Component } from "react";

import ShowAlbum from "./musicSelection/ShowAlbum";
import ShowPlaylist from "./musicSelection/ShowPlaylist";
import SongQueue from "./SongQueue";
import firebase from "firebase/app";
// import "firebase/storage";
import "firebase/database";

import "./styles.css";
import {
  setMediaFromData,
  clearSelectedAlbum,
  selectAlbum
} from "../redux/musiccontent/musicActions";
import { connect } from "react-redux";
import Favourites from "./Favourites";
import AddAlbum from "./AddAlbum";
// import "firebase/database";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // media: [],
      // selectedAlbum: null
    };

    // this.selectAlbum = this.selectAlbum.bind(this);
    // this.clearSelectedAlbum = this.clearSelectedAlbum.bind(this);
    // this.fetchAlbumFromFirebase = this.fetchAlbumFromFirebase.bind(this);
  }

  async fetchAlbumFromFirebase() {
    let promise = new Promise(async (resolve, reject) => {
      await firebase
        .database()
        .ref("/media/")
        .once("value", async data => data.val())
        .then(data => {
          resolve(data.val());
        });
    });
    return promise;
  }

  // Fetching local Json and Media
  componentDidMount() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDr87dvmSpbxtILs8jeREJWkPPrOsgs-2o",
    //   authDomain: "mediaplayer-64e1d.firebaseapp.com",
    //   databaseURL: "https://mediaplayer-64e1d.firebaseio.com",
    //   projectId: "mediaplayer-64e1d",
    //   storageBucket: "mediaplayer-64e1d.appspot.com",
    //   messagingSenderId: "868298162811",
    //   appId: "1:868298162811:web:4ebc9082d04aeccec158de"
    // });

    this.fetchAlbumFromFirebase().then(media => {
      if (media === null) {
        var m = [];
        this.props.setMediaFromData(m);
      } else {
        this.props.setMediaFromData(media);
        console.log(typeof media, media, "retrived meida");
      }

      console.log("data fetched From Firebase");
    });

    // fetch("./media.json")
    //   .then(res => res.json())
    //   .then(media => {
    //     console.log("Hai", media);
    //     this.props.setMediaFromData(media);
    //   });
    //props.setmedia
  }
  // componentDidUpdate() {
  //   this.props.setMediaFromData(this.props.media);
  // }

  render() {
    return (
      <main>
        <div className="albums">
          {this.props.selectedAlbum ? (
            <ShowPlaylist
            // setCurrentSongPlaying={this.props.setCurrentSongPlaying}
            // clearSelectedAlbum={this.clearSelectedAlbum}
            // selectedAlbum={this.state.selectedAlbum}
            // playlist={this.props.playlist}
            // updatePlaylist={this.props.updatePlaylist}
            // playlistIsPlaying={this.props.playlistIsPlaying}
            // currentSongIndex={this.props.currentSongIndex}
            // AddSongMainSongsQueue={this.props.AddSongMainSongsQueue}
            // mainSongsQueue={this.props.mainSongsQueue}
            />
          ) : (
            <ShowAlbum
            // media={this.state.media}
            // selectAlbum={this.selectAlbum}
            // updatePlaylist={this.props.updatePlaylist}
            // currentSongIndex={this.props.currentSongIndex}
            // playlist={this.props.playlist}
            // playlistIsPlaying={this.props.playlistIsPlaying}
            // setAlbumToMainSongsQueue={this.props.setAlbumToMainSongsQueue}
            // setCurrentSongPlaying={this.props.setCurrentSongPlaying}
            />
          )}
        </div>
        <div className="songs-queue">
          {this.props.showSongsQueue ? (
            <SongQueue
            // setCurrentSongPlaying={this.props.setCurrentSongPlaying}
            // mainSongsQueue={this.props.mainSongsQueue}
            // updatePlaylist={this.props.updatePlaylist}
            // showSongsQueue={this.state.showSongsQueue}
            // selectedAlbum={this.state.selectedAlbum}
            // playlistIsPlaying={this.props.playlistIsPlaying}
            // playlist={this.props.playlist}
            // currentSongIndex={this.props.currentSongIndex}
            // currentSongPlaying={this.props.currentSongPlaying}
            // deleteSongPlaylist={this.props.deleteSongPlaylist}
            />
          ) : (
            <div></div>
          )}

          {this.props.showFavList ? (
            <Favourites
            // setCurrentSongPlaying={this.props.setCurrentSongPlaying}
            // mainSongsQueue={this.props.mainSongsQueue}
            // updatePlaylist={this.props.updatePlaylist}
            // showSongsQueue={this.state.showSongsQueue}
            // selectedAlbum={this.state.selectedAlbum}
            // playlistIsPlaying={this.props.playlistIsPlaying}
            // playlist={this.props.playlist}
            // currentSongIndex={this.props.currentSongIndex}
            // currentSongPlaying={this.props.currentSongPlaying}
            // deleteSongPlaylist={this.props.deleteSongPlaylist}
            />
          ) : (
            <div></div>
          )}

          <AddAlbum />
        </div>
      </main>
    );
  }

  // selectAlbum(selectedAlbum) {
  //   this.setState({ selectedAlbum });
  //   console.log(selectedAlbum, "Selected Album");
  // }

  // clearSelectedAlbum() {
  //   this.setState({ selectedAlbum: null });
  // }
}

const mapStateToProps = state => {
  return {
    media: state.music.media,
    selectedAlbum: state.music.selectedAlbum,
    showSongsQueue: state.music.showSongsQueue,
    favSongsList: state.favs.favSongsList,
    showFavList: state.favs.showFavList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMediaFromData: media => dispatch(setMediaFromData(media)),
    clearSelectedAlbum: () => dispatch(clearSelectedAlbum()),
    selectAlbum: selectedAlbum => dispatch(selectAlbum(selectedAlbum))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
