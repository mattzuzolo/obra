import { UPDATE_ARTWORK_ARRAY, SELECT_ARTWORK, LOGIN_USER, SELECT_ANNOTATION } from "./types"

const defaultState = {
  artworkArray: [],
  selectedArtwork: {},
  loggedInUser: {},
  selectedAnnotation: {},
}

export default function(state = defaultState, action) {

  switch(action.type){
    case UPDATE_ARTWORK_ARRAY:
      // return {...state, artworkArray: [...state.artworkArray, ...action.payload]} //this maintains running list. NO DELETION
      return {...state, artworkArray: [...action.payload]}

    case SELECT_ARTWORK:
      return {...state, selectedArtwork: action.payload}

    case SELECT_ANNOTATION:
      return {...state, selectedAnnotation: action.payload}

    case LOGIN_USER:
      return {...state, loggedInUser: action.payload}

    default:
      return state
  }
}
