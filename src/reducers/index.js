import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  auth: authReducer,
});

export default rootReducer;