import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
