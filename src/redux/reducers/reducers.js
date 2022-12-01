const INITIAL_STATE = {
  Sessions: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SESSION': // I create a new Session and save it to the Sessions array
      return {
        ...state,
        Sessions: [
          ...state.Sessions, // I use the spread operator to get the previous Sessions
          {
            // I create a new Session
            id: state.Sessions.length + 1,
            Photos: [], // I create an empty Photos array for the new Session
            Date: new Date().toLocaleString('tr-TR', {
              timeZone: 'Europe/Istanbul',
            }),
          },
        ],
      };
    case 'DEL_SESSION': // action.payload is the session id and after deleting the session we need to update all the session ids as an array index + 1
      return {
        ...state,
        Sessions: state.Sessions.filter(item => item.id !== action.payload).map(
          // map is used to update all the session ids after deleting a selected session with filter method
          (item, index) => {
            return {
              ...item, // I use the spread operator to get the previous values
              id: index + 1,
            };
          },
        ),
      };

    case 'ADD_PHOTO': // we map through sessions and adding photo to the session with the same id
      return {
        ...state,
        Sessions: state.Sessions.map(session => {
          if (session.id == action.payload.id) {
            return {
              ...session, // I use the spread operator to get the previous values
              Photos: [...session.Photos, action.payload.photo], // I add the photo to the Photos array
            };
          } else return session; // if the session id is not equal to the payload id we return the session
        }),
      };

    case 'DEL_PHOTO': // we map through sessions and deleting photo from the selected session
      return {
        ...state,
        Sessions: state.Sessions.map(session => {
          if (session.id == action.payload.id) {
            // if the session id is equal to the payload id we delete the photo from the Photos array
            return {
              ...session,
              Photos: session.Photos.filter(
                // filter is used to delete the photo with the same path
                photo => photo != action.payload.photo, // if the photo path is not equal to the payload path we return the photo(path)
              ),
            };
          } else return session; // if the session id is not equal to the selected session id we return the session
        }),
      };
    case 'SET_SESSIONS': // I use this action to set the Sessions to the InitialState
      return {
        ...state,
        Sessions: action.payload,
      };

    default:
      return state; // if the action type is not equal to any of the above cases we return the state
  }
};

export default reducer;
