const INITIAL_STATE = {
  Sessions: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        Sessions: [
          ...state.Sessions,
          {
            id: state.Sessions.length + 1,
            Photos: [],
            Date: new Date().toLocaleString('tr-TR', {
              timeZone: 'Europe/Istanbul',
            }),
          },
        ],
      };
    case 'ADD_PHOTO':
      //we map through sessions and adding photo to the session with the same id
      return {
        ...state,
        Sessions: state.Sessions.map(session => {
          if (session.id == action.payload.id) {
            return {
              ...session,
              Photos: [...session.Photos, action.payload.photo],
            };
          } else return session;
        }),
      };

    case 'DEL_PHOTO':
      //we map through sessions and deleting photo from the selected session
      return {
        ...state,
        Sessions: state.Sessions.map(session => {
          if (session.id == action.payload.id) {
            return {
              ...session,
              Photos: session.Photos.filter(
                photo => photo.uri != action.payload.photo.uri,
              ),
            };
          } else return session;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
