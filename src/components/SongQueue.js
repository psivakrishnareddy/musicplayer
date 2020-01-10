import React from "react";
import "./styles.css";
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
  clearSelectedAlbum,
  selectAlbum,
  setAlbumToMainSongsQueue
} from "../redux/musiccontent/musicActions";
import {
  addSongToFav,
  removeFavSong,
  showFavSongs
} from "../redux/favourites/favActions";
const SongQueue = props => {
  if (props.mainSongsQueue !== null) {
    return (
      <React.Fragment>
        <h2>Songs List</h2>
        {/* {console.log(props.mainSongsQueue, "In songs Queue", props.playlist)} */}
        {props.mainSongsQueue.map((queueSong, index) => (
          <li
            onClick={() => {
              props.updatePlaylist(props.mainSongsQueue, index);
              props.setCurrentSongPlaying(queueSong);
            }}
            key={index}
            style={
              // props.currentSongPlaying === queueSong &&
              props.currentSongIndex === index
                ? { borderColor: "yellow" }
                : { borderColor: "Gray" }
            }
            className="song-in-queue"
          >
            <span style={{ textOverflow: "ellipsis" }}>{queueSong.name}</span>
            <span className="delete-song">
              <i
                onClick={() => props.deleteSongPlaylist(queueSong.name)}
                className="fa fa-window-close"
                aria-hidden="true"
              ></i>
            </span>
          </li>
        ))}
      </React.Fragment>
    );
  } else if (props.mainSongsQueue === null && props.showSongsQueue) {
    return <h2>No Album Selected</h2>;
  } else {
    return <div>NO songs in queue</div>;
  }
};

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
export default connect(mapStateToProps, mapDispatchToProps)(SongQueue);
