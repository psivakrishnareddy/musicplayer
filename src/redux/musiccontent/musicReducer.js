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

const initialState = {
  playlist: null,
  playlistIsPlaying: false,
  currentSongIndex: 0,
  showSongsQueue: false,
  mainSongsQueue: [],
  currentSongPlaying: "",
  media: [],
  selectedAlbum: null,
  showAddAlbumAdd: false,
  uploadSong: []
};

const musicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PLAYLIST:
      let Data = {};
      payload.playlist = payload.playlist.map(song => song.src);

      if (Number.isInteger(payload.currentSongIndex)) {
        // Changes state of Playlist if user selects other album

        if (
          JSON.stringify(payload.playlist) !== JSON.stringify(state.playlist)
        ) {
          Data = {
            playlist: payload.playlist,
            playlistIsPlaying: true,
            currentSongIndex: payload.currentSongIndex,
            currentSongPlaying: payload.playlist[payload.currentSongIndex]
          };
        } else Data = { playlistIsPlaying: !state.playlistIsPlaying };
        // if not new playlist toggle play and pause
        // if different soong is clickeds
        if (payload.currentSongIndex !== state.currentSongIndex)
          Data = {
            currentSongIndex: payload.currentSongIndex,
            playlistIsPlaying: true,
            currentSongPlaying: payload.playlist[payload.currentSongIndex]
          };
      } else {
        // if Just a Album is clicked and song is not selected CI is undefined
        if (JSON.stringify(payload.playlist) !== JSON.stringify(state.playlist))
          Data = {
            playlist: payload.playlist,
            playlistIsPlaying: true,
            currentSongIndex: 0,
            currentSongPlaying: payload.playlist[0]
          };
        else Data = { playlistIsPlaying: !state.playlistIsPlaying };
      }
      return { ...state, ...Data };

    case NEXTSONG_PLAYLIST:
      let Dat = {};

      if (Number.isInteger(payload.currentSongIndex)) {
        // Changes state of Playlist if user selects other album

        if (
          JSON.stringify(payload.playlist) !== JSON.stringify(state.playlist)
        ) {
          Dat = {
            playlist: payload.playlist,
            playlistIsPlaying: true,
            currentSongIndex: payload.currentSongIndex,
            currentSongPlaying: payload.playlist[payload.currentSongIndex]
          };
        } else Dat = { playlistIsPlaying: !state.playlistIsPlaying };
        // if not new playlist toggle play and pause
        // if different soong is clickeds
        if (payload.currentSongIndex !== state.currentSongIndex)
          Dat = {
            currentSongIndex: payload.currentSongIndex,
            playlistIsPlaying: true,
            currentSongPlaying: payload.playlist[payload.currentSongIndex]
          };
      } else {
        // if Just a Album is clicked and song is not selected CI is undefined
        if (JSON.stringify(payload.playlist) !== JSON.stringify(state.playlist))
          Dat = {
            playlist: payload.playlist,
            playlistIsPlaying: true,
            currentSongIndex: 0,
            currentSongPlaying: payload.playlist[0]
          };
        else Dat = { playlistIsPlaying: !state.playlistIsPlaying };
      }

      return { ...state, ...Dat };

    case SHOW_QUEUE_SONGS:
      return { ...state, showSongsQueue: payload };

    case SET_IS_PLAYING_PAUSE:
      return { ...state, playlistIsPlaying: false };

    case DELETE_SONG_PLAYLIST:
      let SongsQueue = state.mainSongsQueue;
      console.log(SongsQueue, "Main Playlist");
      state.mainSongsQueue.forEach((song, index) => {
        if (song.name === payload) {
          SongsQueue.splice(index, 1);
        }
      });
      return { ...state, mainSongsQueue: SongsQueue };

    case ADDSONG_TO_QUEUE:
      if (state.mainSongsQueue.indexOf(payload) === -1) {
        return { ...state, mainSongsQueue: [...state.mainSongsQueue, payload] };
      } else {
        return state;
      }
    case SET_ALBUM_TO_MAINQUE:
      let queue = state.mainSongsQueue;
      payload.forEach(playlistItem => {
        if (state.mainSongsQueue.indexOf(playlistItem) === -1) {
          queue.push(playlistItem);
        }
      });

      return { ...state, mainSongsQueue: queue };
    case CLEAR_MAINQUEUE:
      return {
        ...state,
        mainSongsQueue: [],
        playlist: [],
        currentSongPlaying: ""
      };
    case CURRENT_SONG_PLAYING:
      return { ...state, currentSongPlaying: payload };
    case SELECT_ALBUM:
      return { ...state, selectedAlbum: payload };
    case CLEAR_ALBUM:
      return { ...state, selectedAlbum: null };

    case SET_MEDIA:
      payload.forEach((item, index) => {
        if (item.songs === undefined) {
          payload[index] = { ...payload[index], songs: [] };
        }
      });

      console.log(payload, "set meida...");
      return { ...state, media: payload };
    case SET_ALBUM_ADD:
      return { ...state, showAddAlbumAdd: payload };
    case UPLOAD_SONG:
      return { ...state, uploadSong: payload };
    default:
      return state;
  }
};

export default musicReducer;
