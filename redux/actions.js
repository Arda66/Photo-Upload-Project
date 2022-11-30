const CreateSession = () => {
  return {
    type: 'CREATE_SESSION',
  };
};
const AddPhoto = (photo, id) => {
  return {
    type: 'ADD_PHOTO',
    payload: {photo: photo, id: id},
  };
};
const DeletePhoto = (photo, id) => {
  // this id is the session id !
  return {
    type: 'DEL_PHOTO',
    payload: {photo: photo, id: id},
  };
};
const SetSessions = sessions => {
  return {
    type: 'SET_SESSIONS',
    payload: sessions,
  };
};

export {CreateSession, AddPhoto, DeletePhoto, SetSessions};
