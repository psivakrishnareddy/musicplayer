import React from "react";
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
} from "../../redux/musiccontent/musicActions";
import { addAlbumShow } from "../../redux/musiccontent/musicActions";
const ShowAlbum = props => {
  const pointerStyles = { cursor: "pointer" };
  // console.log(props.media, "show album");

  return (
    <React.Fragment>
      <h2>Albums</h2>
      <div className="grid">
        {props.media &&
          props.media.map((playlist, index) => (
            <div
              className="playlist-square"
              style={pointerStyles}
              onClick={() => {
                props.selectAlbum(playlist);
                // props.updatePlaylist(playlist.songs);
                // props.setAlbumToMainSongsQueue(playlist.songs);
              }}
              key={`playlist-${index}`}
            >
              {console.log(playlist, "playlist......")}
              <img src={playlist.albumArtwork} alt={playlist.albumName} />
              <div
                className="play-button"
                onClick={e => {
                  e.stopPropagation();
                  props.setAlbumToMainSongsQueue(playlist.songs);
                  props.setCurrentSongPlaying(playlist.songs[0]);
                  props.updatePlaylist(playlist.songs);
                }}
              >
                {JSON.stringify(props.playlist) ===
                  JSON.stringify(playlist.songs.map(song => song.src)) &&
                props.playlistIsPlaying ? (
                  <i className="fa fa-pause" style={{ paddingLeft: "3px" }} />
                ) : (
                  <i className="fa fa-play" style={{ paddingLeft: "3px" }} />
                )}
              </div>
            </div>
          ))}

        <div
          onClick={() => props.addAlbumShow(!props.showAddAlbumAdd)}
          className="playlist-square-add"
          style={pointerStyles}
        >
          <i className="fa fa-plus-square"></i>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    media: state.music.media,
    selectedAlbum: state.music.selectedAlbum,
    playlist: state.music.playlist,
    playlistIsPlaying: state.music.playlistIsPlaying,
    currentSongIndex: state.music.currentSongIndex,
    showSongsQueue: state.music.showSongsQueue,
    mainSongsQueue: state.music.mainSongsQueue,
    currentSongPlaying: state.music.currentSongPlaying,
    showAddAlbumAdd: state.music.showAddAlbumAdd
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
    setCurrentSongPlaying: song => dispatch(setCurrentSongPlaying(song)),
    addAlbumShow: show => dispatch(addAlbumShow(show))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowAlbum);
