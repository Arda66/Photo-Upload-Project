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

export {CreateSession, AddPhoto, DeletePhoto};
