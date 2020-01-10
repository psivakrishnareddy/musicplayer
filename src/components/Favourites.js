import React from "react";
import { connect } from "react-redux";
import { showFavSongs, removeFavSong } from "../redux/favourites/favActions";
import {
  updatePlaylist,
  setCurrentSongPlaying
} from "../redux/musiccontent/musicActions";
const Favourites = props => {
  if (props.showFavList !== null) {
    return (
      <React.Fragment>
        <h2>Favourites</h2>
        {/* {console.log(props.mainSongsQueue, "In songs Queue", props.playlist)} */}
        {props.favSongsList.map((queueSong, index) => (
          <li
            onClick={() => {
              props.updatePlaylist(props.favSongsList, index);
              props.setCurrentSongPlaying(queueSong);
            }}
            key={index}
            //   style={
            //     // props.currentSongPlaying === queueSong &&
            //     this.props.currentSongIndex === index
            //       ? { borderColor: "yellow" }
            //       : { borderColor: "Gray" }
            //   }
            className="song-in-queue"
          >
            <span style={{ textOverflow: "ellipsis" }}>{queueSong.name}</span>
            <span className="delete-song">
              <i
                onClick={() => {
                  props.removeFavSong(queueSong.name);
                }}
                className="fa fa-window-close"
                aria-hidden="true"
              ></i>
            </span>
          </li>
        ))}
      </React.Fragment>
    );
  } else if (this.props.favSongsList === null && this.props.showFavList) {
    return <h2>No Favourites Selected</h2>;
  } else {
    return <div>NO Favs</div>;
  }
};

const mapStateToProps = state => {
  return {
    // media: state.music.media,
    // selectedAlbum: state.music.selectedAlbum,
    // showSongsQueue: state.music.showSongsQueue,
    favSongsList: state.favs.favSongsList,
    showFavList: state.favs.showFavList,
    currentSongIndex: state.music.currentSongIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showFavSongs: showFav => dispatch(showFavSongs(showFav)),
    updatePlaylist: (playlist, currentSongIndex) =>
      dispatch(updatePlaylist(playlist, currentSongIndex)),
    setCurrentSongPlaying: song => dispatch(setCurrentSongPlaying(song)),
    removeFavSong: song => dispatch(removeFavSong(song))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
