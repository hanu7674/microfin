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

  // Only add logger middleware in development
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  
  // Only add monitor enhancer in development
  if (process.env.NODE_ENV === 'development') {
    enhancers.push(monitorReducersEnhancer);
  }

  const composedEnhancers = compose(...enhancers);  
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // Only enable hot reloading in development
  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }
  
  return store;
}
