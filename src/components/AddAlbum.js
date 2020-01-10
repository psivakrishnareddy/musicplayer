import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { connect } from "react-redux";
import {
  addAlbumShow,
  setMediaFromData
} from "../redux/musiccontent/musicActions";
class AddAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumname: "",
      artistname: "",
      Img: null,
      albumfolder: null,
      uploading: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleArtistName = this.handleArtistName.bind(this);
    // this.handleImage = this.handleImage.bind(this);
    this.handleFolder = this.handleFolder.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.createObj = this.createObj.bind(this);
  }

  // firebase json updating
  createObj(albumArtist, albumArtwork, albumName, songs) {
    let MediaData = this.props.media;
    var album = {
      albumArtist: albumArtist,
      albumArtwork: albumArtwork,
      albumName: albumName,
      songs: songs
    };
    MediaData.push(album);
    console.log(album, "created Album...");
    firebase
      .database()
      .ref("media/")
      .set(MediaData);
  }
  handlesubmit(e) {
    console.log(
      this.state.albumname,
      this.state.artistname,
      this.state.Img,
      this.state.albumfolder,
      "DataForm"
    );

    // Create a root reference
    var storageRef = firebase.storage();
    var uploadTask;
    var songs = [];
    // var imageLink = "";
    this.setState({ uploading: true });
    // for (let i = 0; i < this.state.albumfolder.length; i++) {
    //   uploadTask = storageRef
    //     .ref(
    //       "static/" +
    //         this.state.albumname +
    //         "/" +
    //         this.state.albumfolder[i].name
    //     )
    //     .put(this.state.albumfolder[i]);
    //   // Here is my Dowload links
    //   uploadTask
    //     .then(snapshot => {
    //       return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
    //     })
    //     .then(link => {
    //       console.log(link, "Download Link", this.state.albumfolder[i].name);
    //       if (
    //         this.state.albumfolder[i].name.split(".")[0] ===
    //         this.state.albumname
    //       ) {
    //         imageLink = link;
    //       } else {
    //         songs.push({ name: this.state.albumfolder[i].name, src: link });
    //       }
    //     });
    // }
    // IMAGE UPLOAD...
    uploadTask = storageRef
      .ref("static/" + this.state.albumname + "/" + this.state.albumname)
      .put(this.state.Img);

    // Here is my Dowload links
    uploadTask
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(link => {
        console.log(link, "Download Link", this.state.Img.name);
        // imageLink = link;
        this.createObj(
          this.state.artistname,
          link,
          this.state.albumname,
          songs
        );
        // this.props.setMediaFromData(this.props.media);
      });

    uploadTask.on("state_changed", snapshot => {
      console.log(snapshot.bytesTransferred, snapshot.totalBytes);

      if (snapshot.bytesTransferred === snapshot.totalBytes) {
        this.setState({ uploading: false });
        this.props.addAlbumShow(!this.props.showAddAlbumAdd);
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
  handleName(e) {
    this.setState({ albumname: e.target.value });
  }
  handleArtistName(e) {
    this.setState({ artistname: e.target.value });
  }
  handleImage(e) {
    console.log(e.target.files[0]);
    // e.preventDefault();
    this.setState({ Img: e.target.files[0] });
  }

  handleFolder(e) {
    console.log(e.target.files);
    this.setState({ albumfolder: e.target.files });
  }
  //   componentDidUpdate() {
  //     console.log(document.getElementById("albumaddForm").files);
  //   }
  render() {
    if (this.props.showAddAlbumAdd && !this.state.uploading) {
      return (
        <React.Fragment>
          <div>
            <h2>Add Album</h2>
            <form
              id="albumaddForm"
              onSubmit={this.handlesubmit}
              encType="multipart/form-data"
            >
              <label htmlFor="album-name">Album Name:</label>
              <input
                type="text"
                id="album-name"
                name="album-name"
                onChange={e => this.handleName(e)}
                value={this.state.albumname}
              />
              <br />
              <label htmlFor="artist-name">Artist Name:</label>
              <input
                type="text"
                id="artist-name"
                name="artist-name"
                onChange={e => this.handleArtistName(e)}
                value={this.state.artistname}
              />
              <br />
              <label htmlFor="album-name">Image:</label>
              <input
                type="file"
                id="album-image"
                accept=".jpg"
                name="album-image"
                onChange={e => this.handleImage(e)}
              />
              <br />
              {/* <label htmlFor="album-folder">AlbumFolder</label>
              <input
                id="album-folder"
                name="album-folder"
                type="file"
                webkitdirectory="true"
                mozdirectory="true"
                onChange={e => this.handleFolder(e)}
              /> */}
              <button type="submit">Upload</button>
            </form>
          </div>
        </React.Fragment>
      );
    } else if (this.state.uploading) {
      return (
        <React.Fragment>
          {this.state.uploading && (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    showAddAlbumAdd: state.music.showAddAlbumAdd,
    media: state.music.media
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlbumShow: show => dispatch(addAlbumShow(show)),
    setMediaFromData: media => dispatch(setMediaFromData(media))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum);
