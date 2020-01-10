import { ADD_TO_FAV, REMOVE_FAV, SHOW_FAV } from "./favTypes";

const initialState = {
  favSongsList: [],
  showFavList: false
};

const favReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_FAV:
      let fav = [];
      console.log(payload, "Song at reducer add");
      if (state.favSongsList.indexOf(payload) === -1) {
        fav = [...state.favSongsList, payload];
      } else {
        fav = [...state.favSongsList];
      }
      return { ...state, favSongsList: fav };
    case REMOVE_FAV:
      let SongsQueue = state.favSongsList;
      console.log(SongsQueue, "fav list");
      state.favSongsList.forEach((song, index) => {
        if (song.name === payload) {
          // console.log(song, "song in remov faav", index);
          SongsQueue.splice(index, 1);
        }
      });
      return {
        ...state,
        favSongsList: SongsQueue
      };

    case SHOW_FAV:
      return { ...state, showFavList: payload };

    default:
      return state;
  }
};
export default favReducer;
