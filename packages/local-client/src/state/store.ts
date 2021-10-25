import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { pressistMiddleware } from './middleware/pressist-middleware';

export const store = createStore(reducers, {}, applyMiddleware(pressistMiddleware, thunk));
