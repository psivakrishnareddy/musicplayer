import {
  UPDATE_PLAYLIST,
  NEXTSONG_PLAYLIST,
  SHOW_QUEUE_SONGS,
  SET_IS_PLAYING_PAUSE,
  DELETE_SONG_PLAYLIST,
  ADDSONG_TO_QUEUE,
  SET_ALBUM_TO_MAINQUE,
  CLEAR_MAINQUEUE,
  CURRENT_SONG_PLAYING,
  SELECT_ALBUM,
  CLEAR_ALBUM,
  SET_MEDIA,
  SET_ALBUM_ADD,
  UPLOAD_SONG
} from "./musicTypes";

export function updatePlaylist(playlist, currentSongIndex) {
  return {
    type: UPDATE_PLAYLIST,
    payload: { playlist, currentSongIndex }
  };
}

export function nextSongPlaylist(playlist, currentSongIndex) {
  return {
    type: NEXTSONG_PLAYLIST,
    payload: { playlist, currentSongIndex }
  };
}

export function showSongsPlaylistQueue(showQue) {
  console.log("Start ==>", showQue);
  return {
    type: SHOW_QUEUE_SONGS,
    payload: showQue
  };
}

export function setIsplayingPause() {
  return {
    type: SET_IS_PLAYING_PAUSE,
    payload: null
  };
}
export function deleteSongPlaylist(songNameItem) {
  return {
    type: DELETE_SONG_PLAYLIST,
    payload: songNameItem
  };
}
export function setAlbumToMainSongsQueue(playlist) {
  return {
    type: SET_ALBUM_TO_MAINQUE,
    payload: playlist
  };
}

export function AddSongMainSongsQueue(song) {
  return {
    type: ADDSONG_TO_QUEUE,
    payload: song
  };
}

export function clearMainSongsQueue() {
  return {
    type: CLEAR_MAINQUEUE,
    payload: null
  };
}
export function setCurrentSongPlaying(song) {
  return {
    type: CURRENT_SONG_PLAYING,
    payload: song
  };
}

export function selectAlbum(selectedAlbum) {
  return {
    type: SELECT_ALBUM,
    payload: selectedAlbum
  };
}

export function clearSelectedAlbum() {
  return {
    type: CLEAR_ALBUM,
    payload: null
  };
}

export function setMediaFromData(media) {
  return {
    type: SET_MEDIA,
    payload: media
  };
}

export function addAlbumShow(show) {
  return {
    type: SET_ALBUM_ADD,
    payload: show
  };
}

export function uploadNewSong(song) {
  return {
    type: UPLOAD_SONG,
    payload: song
  };
}
