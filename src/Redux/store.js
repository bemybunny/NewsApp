import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk/es';
import { composeWithDevTools } from 'redux-devtools-extension';
import newsReducer from './reducers.js'; // Ensure the correct path to the reducer file

const store = createStore(newsReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log('Store created:', store.getState());

export default store;