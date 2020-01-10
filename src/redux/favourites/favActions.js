import { ADD_TO_FAV, REMOVE_FAV, SHOW_FAV } from "./favTypes";

export const addSongToFav = favSong => ({
  type: ADD_TO_FAV,
  payload: favSong
});

export const removeFavSong = remSongFav => ({
  type: REMOVE_FAV,
  payload: remSongFav
});

export const showFavSongs = showFav => ({
  type: SHOW_FAV,
  payload: showFav
});
