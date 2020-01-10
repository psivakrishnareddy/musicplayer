import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addSongToFav,
  removeFavSong,
  showFavSongs
} from "../../redux/favourites/favActions";
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
  clearSelectedAlbum,
  uploadNewSong,
  setMediaFromData
} from "../../redux/musiccontent/musicActions";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
class ShowPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      song: null,
      uploading: false
    };
    this.handleSubmitUpload = this.handleSubmitUpload.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(e) {
    console.log(e.target.files[0]);
    this.setState({ song: e.target.files[0] });
  }
  handleSubmitUpload(e) {
    var storageRef = firebase.storage();
    var uploadTask;
    // var songs = [];

    this.setState({ uploading: true });

    uploadTask = storageRef
      .ref(
        "static/" +
          this.props.selectedAlbum.albumName +
          "/" +
          this.state.song.name
      )
      .put(this.state.song);

    // Here is my Dowload links
    uploadTask
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(link => {
        console.log(link, "Download Link", this.state.song.name);
        // imageLink = link;
        var media = this.props.media;
        media.forEach((data, index) => {
          if (data.albumName === this.props.selectedAlbum.albumName) {
            media[index].songs.push({
              name: this.state.song.name.split(".")[0],
              src: link
            });
          }
        });
        firebase
          .database()
          .ref("media/")
          .set(media);
        this.props.setMediaFromData(media);
      });

    uploadTask.on("state_changed", snapshot => {
      console.log(snapshot.bytesTransferred, snapshot.totalBytes);

      if (snapshot.bytesTransferred === snapshot.totalBytes) {
        this.setState({ uploading: false });
        // this.props.addAlbumShow(!this.props.showAddAlbumAdd);
        alert("Uploaded Successfully...");

        // this.createObj(
        //   this.state.artistname,
        //   imageLink,
        //   this.state.albumname,
        //   songs
        // );
      }
    });

    e.preventDefault();
  }
  render() {
    const pointerStyles = { cursor: "pointer" };
    return (
      <React.Fragment>
        <div className="album">
          <span style={pointerStyles} onClick={this.props.clearSelectedAlbum}>
            ‹ Back to Soundtracks
          </span>
          <div className="album-meta">
            <img
              src={this.props.selectedAlbum.albumArtwork}
              alt={this.props.selectedAlbum.albumName}
            />
            <span>{this.props.selectedAlbum.albumName}</span>
          </div>
          <div className="album-playlist">
            {this.props.selectedAlbum.songs.map((song, index) => (
              <React.Fragment key={`songname-${index}`}>
                <div
                  className="playlist-favs"
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={() => {
                    console.log("favourite", song);
                    this.props.addSongToFav(song);
                    console.log(this.props.favSongsList, "favourites");
                  }}
                >
                  <i
                    className="fa fa-heart"
                    style={{ cursor: "pointer", float: "right" }}
                  />
                </div>
                <div
                  className="playlist-song"
                  onClick={() => {
                    this.props.updatePlaylist(
                      this.props.selectedAlbum.songs,
                      index
                    );
                    this.props.AddSongMainSongsQueue(
                      this.props.selectedAlbum.songs[index]
                    );
                    this.props.setCurrentSongPlaying(
                      this.props.selectedAlbum.songs[index]
                    );
                  }}
                >
                  {JSON.stringify(this.props.playlist) ===
                    JSON.stringify(
                      this.props.selectedAlbum.songs.map(song => song.src)
                    ) &&
                  this.props.playlistIsPlaying &&
                  this.props.currentSongIndex === index ? (
                    <i className="fa fa-pause" style={pointerStyles} />
                  ) : (
                    <i className="fa fa-play" style={pointerStyles} />
                  )}

                  <span style={pointerStyles}>{song.name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <form
            style={{ marginBottom: "70px" }}
            onSubmit={e => this.handleSubmitUpload(e)}
          >
            <input
              type="file"
              onChange={e => this.handleUploadImage(e)}
            ></input>
            <button type="submit">Add Song</button>
            {this.state.uploading && (
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

// const ShowPlaylist = props => {
//   const pointerStyles = { cursor: "pointer" };
//   return (
//     <React.Fragment>
//       <div className="album">
//         <span style={pointerStyles} onClick={props.clearSelectedAlbum}>
//           ‹ Back to Soundtracks
//         </span>
//         <div className="album-meta">
//           <img
//             src={props.selectedAlbum.albumArtwork}
//             alt={props.selectedAlbum.albumName}
//           />
//           <span>{props.selectedAlbum.albumName}</span>
//         </div>
//         <div className="album-playlist">
//           {props.selectedAlbum.songs.map((song, index) => (
//             <React.Fragment key={`songname-${index}`}>
//               <div
//                 className="playlist-favs"
//                 style={{ cursor: "pointer", float: "right" }}
//                 onClick={() => {
//                   console.log("favourite", song);
//                   props.addSongToFav(song);
//                   console.log(props.favSongsList, "favourites");
//                 }}
//               >
//                 <i
//                   className="fa fa-heart"
//                   style={{ cursor: "pointer", float: "right" }}
//                 />
//               </div>
//               <div
//                 className="playlist-song"
//                 onClick={() => {
//                   props.updatePlaylist(props.selectedAlbum.songs, index);
//                   props.AddSongMainSongsQueue(props.selectedAlbum.songs[index]);
//                   props.setCurrentSongPlaying(props.selectedAlbum.songs[index]);
//                 }}
//               >
//                 {JSON.stringify(props.playlist) ===
//                   JSON.stringify(
//                     props.selectedAlbum.songs.map(song => song.src)
//                   ) &&
//                 props.playlistIsPlaying &&
//                 props.currentSongIndex === index ? (
//                   <i className="fa fa-pause" style={pointerStyles} />
//                 ) : (
//                   <i className="fa fa-play" style={pointerStyles} />
//                 )}

//                 <span style={pointerStyles}>{song.name}</span>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//         <form>
//           <input
//             type="file"
//             onChange={props.uploadNewSong(e.target.files[0])}
//           ></input>
//           <button type="button">Add Song</button>
//         </form>
//       </div>
//     </React.Fragment>
//   );
// };

const mapStateToProps = state => {
  return {
    favSongsList: state.favs.favSongsList,
    playlist: state.music.playlist,
    playlistIsPlaying: state.music.playlistIsPlaying,
    currentSongIndex: state.music.currentSongIndex,
    showSongsQueue: state.music.showSongsQueue,
    mainSongsQueue: state.music.mainSongsQueue,
    currentSongPlaying: state.music.currentSongPlaying,
    selectedAlbum: state.music.selectedAlbum,
    uploadSong: state.music.uploadSong,
    media: state.music.media
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
    setCurrentSongPlaying: song => dispatch(setCurrentSongPlaying(song)),
    uploadNewSong: song => dispatch(uploadNewSong(song)),
    setMediaFromData: media => dispatch(setMediaFromData(media))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPlaylist);
