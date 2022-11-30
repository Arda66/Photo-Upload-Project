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
      return {
        ...state,
        Sessions: [
          ...state.Sessions,
          //map through sessions and add photo to the selected session
          state.Sessions.map(session => {
            if (session.id === action.payload.id) {
              // we need to find the session id that we pressed on and add the photo to it
              return {
                ...session,
                Photos: [...session.Photos, action.payload.photo],
              };
            }
            return session;
          }),
        ],
      };
    case 'DEL_PHOTO':
      return {
        ...state,
        Sessions: [
          ...state.Sessions,
          //map through sessions and delete photo from the selected session
          state.Sessions.map(session => {
            if (session.id === action.payload.id) {
              // we need to find the session id that we pressed on and delete the photo from it
              return {
                ...session,
                Photos: session.Photos.filter(
                  photo => photo !== action.payload.photo,
                ),
              };
            }
            return session;
          }),
        ],
      };
    default:
      return state;
  }
};

// Session.push({
//     id: 1,
//     Photos: [],
//     Date: new Date(),
// });

export default reducer;
