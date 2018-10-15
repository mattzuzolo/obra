import { UPDATE_ARTWORK_ARRAY, SELECT_ARTWORK, SELECT_ANNOTATION, LOGIN_USER } from "./types"

export function updateArtworkArrayAction(artworkArray) {
  return { type: UPDATE_ARTWORK_ARRAY, payload: artworkArray }
}

export function selectArtworkAction(chosenArtwork) {
  return { type: SELECT_ARTWORK, payload: chosenArtwork }
}

export function selectAnnotationAction(chosenAnnotation) {
  return { type: SELECT_ANNOTATION, payload: chosenAnnotation }
}

export function loginUserAction(user) {
  return { type: LOGIN_USER, payload: user }
}
