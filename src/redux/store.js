import {createStore, combineReducers} from 'redux';
import reducer from './reducers/reducers';

// I combine all the reducers into one but I only have one reducer so I don't need to combine them
// but I may will use this method in the future when I have more than one reducer
const rootReducer = combineReducers({reducer});

const store = createStore(rootReducer); // I create the store and pass the rootReducer to it

export default store;
