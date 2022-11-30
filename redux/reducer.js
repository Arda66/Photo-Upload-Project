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
    case 'DEL_SESSION':
      // action.payload is the session id and after deleting the session we need to update all the session ids
      return {
        ...state,
        Sessions: state.Sessions.filter(item => item.id !== action.payload).map(
          // map is used to update all the session ids after deleting a session with filter method
          (item, index) => {
            return {
              ...item,
              id: index + 1,
            };
          },
        ),
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
                photo => photo != action.payload.photo,
              ),
            };
          } else return session;
        }),
      };
    case 'SET_SESSIONS':
      return {
        ...state,
        Sessions: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
