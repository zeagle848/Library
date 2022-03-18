export function getStateFromStorage() {
  try {
    return JSON.parse(sessionStorage.getItem('my_library'));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setStateToStorage(state) {
  sessionStorage.setItem('my_library', JSON.stringify(state));
}
