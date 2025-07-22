import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from '../enhancers/monitorReducer';
import loggerMiddleware from '../middleware/logger';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument({
     
    })
  ];

  middlewares.push(loggerMiddleware);

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
     enhancers.push(monitorReducersEnhancer);

  const composedEnhancers = compose(...enhancers);  
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // Only enable hot reloading in development
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }
  
  return store;
}
