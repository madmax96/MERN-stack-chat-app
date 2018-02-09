import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import Ws from '../utils/ws';
import messageReducer from '../Reducers/messageReducer';
import thunk from 'redux-thunk';
import config from '../Config/config';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const websocket = new Ws(config.url);
export default ()=>{
    const store = createStore(
        combineReducers({
          messages: messageReducer,
          websocket:()=>websocket
        }),
       composeEnhancers(applyMiddleware(thunk))
      );
      return store;
}
