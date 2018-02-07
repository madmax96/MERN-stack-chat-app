import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import messageReducer from '../Reducers/messageReducer';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default ()=>{
    const store = createStore(
        combineReducers({
          messages: messageReducer,
        }),
       composeEnhancers(applyMiddleware(thunk))
      );
      return store;
}
