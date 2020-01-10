import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updatePlaylist,
  nextSongPlaylist,
  showSongsPlaylistQueue,
  setIsplayingPause,
  deleteSongPlaylist,
  AddSongMainSongsQueue,
  clearMainSongsQueue,
  setCurrentSongPlaying,
  setAlbumToMainSongsQueue,
  selectAlbum,
  clearSelectedAlbum
} from "../redux/musiccontent/musicActions";
import {
  addSongToFav,
  removeFavSong,
  showFavSongs
} from "../redux/favourites/favActions";
class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    if (this.props.playlistIsPlaying === false) {
      if (document.getElementById("media-player-section") !== null) {
        document.getElementById("media-player-section").pause();
      }
    }
    if (
      document.getElementById("media-player-section") !== null &&
      this.props.playlistIsPlaying
    ) {
      document.getElementById("media-player-section").load();
      console.log(document.getElementById("media-player-section").ended);
      if (document.getElementById("media-player-section").ended) {
        console.log("song finished");
      }
    }
  }

  render() {
    if (
      this.props.playlistIsPlaying ||
      this.props.playlist !== null ||
      this.props.playlistIsPlaying
    ) {
      return (
        <React.Fragment>
          {/* {console.log(
            this.props.playlist,
            "playlist===",
            this.props.mainSongsQueue,
            "main queue"
          )} */}
          {/* {console.log(this.props)} */}
          <div className="player-section">
            <audio
              controls
              autoPlay={this.props.playlistIsPlaying}
              id="media-player-section"
              onPause={() => this.props.setIsplayingPause()}
              onPlay={() => {
                if (document.getElementById("media-player-section") !== null) {
                  document.getElementById("media-player-section").play();
                  // this.props.setIsplayingPlay();
                }
              }}
              onEnded={() =>
                this.props.nextSongPlaylist(
                  this.props.playlist,
                  (this.props.currentSongIndex + 1) % this.props.playlist.length
                )
              }
            >
              <source
                type="audio/mp3"
                src={
                  this.props.playlist &&
                  this.props.playlist[this.props.currentSongIndex]
                }
              ></source>
              <source
                type="audio/mpeg"
                src={
                  this.props.playlist &&
                  this.props.playlist[this.props.currentSongIndex]
                }
              ></source>
            </audio>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>NO songs</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    favSongsList: state.favs.favSongsList,
    playlist: state.music.playlist,
    playlistIsPlaying: state.music.playlistIsPlaying,
    currentSongIndex: state.music.currentSongIndex,
    showSongsQueue: state.music.showSongsQueue,
    mainSongsQueue: state.music.mainSongsQueue,
    currentSongPlaying: state.music.currentSongPlaying,
    selectedAlbum: state.music.selectedAlbum
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addSongToFav: favSong => dispatch(addSongToFav(favSong)),
    removeFavSong: remSongFav => dispatch(removeFavSong(remSongFav)),
    showFavSongs: showFav => dispatch(showFavSongs(showFav)),
    clearSelectedAlbum: () => dispatch(clearSelectedAlbum()),
    selectAlbum: selectedAlbum => dispatch(selectAlbum(selectedAlbum)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
