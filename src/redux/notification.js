import { collection, doc, getDoc, getDocs, query, where, writeBatch, Timestamp, orderBy, limit, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../Firebase/firebase';
import { notify } from 'reapop';

// Notification Types
export const NOTIFICATION_TYPES = {
  // Academic Notifications
  COURSE_ASSIGNED: 'COURSE_ASSIGNED',
  COURSE_UPDATED: 'COURSE_UPDATED',
  COURSE_REMOVED: 'COURSE_REMOVED',
  
  // Assessment Notifications
  ASSESSMENT_CREATED: 'ASSESSMENT_CREATED',
  ASSESSMENT_DUE: 'ASSESSMENT_DUE',
  ASSESSMENT_GRADED: 'ASSESSMENT_GRADED',
  GRADE_PUBLISHED: 'GRADE_PUBLISHED',
  
  // Attendance Notifications
  ATTENDANCE_MARKED: 'ATTENDANCE_MARKED',
  ATTENDANCE_UPDATED: 'ATTENDANCE_UPDATED',
  LOW_ATTENDANCE_WARNING: 'LOW_ATTENDANCE_WARNING',
  
  // System Notifications
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  REMINDER: 'REMINDER',
  ALERT: 'ALERT'
};

// Notification Priority
export const NOTIFICATION_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

// Notification Status
export const NOTIFICATION_STATUS = {
  SENT: 'SENT',        // Initial status when notification is created
  RECEIVED: 'RECEIVED', // When notification is received by the user's device
  VIEWED: 'VIEWED',    // When notification appears in user's feed/list
  OPENED: 'OPENED',    // When user clicks/opens the notification
  READ: 'READ',        // When user has fully read the notification
  ARCHIVED: 'ARCHIVED' // When notification is archived
};

// Action Types
export const NOTIFICATION_ACTIONS = {
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS'
};

// Initial State
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null
};

// Helper Functions
export const createNotificationContent = (type, data) => {
  switch (type) {
    case NOTIFICATION_TYPES.COURSE_ASSIGNED:
      return {
        title: 'New Course Assignment',
        message: `You have been assigned to ${data.courseName}`,
        priority: NOTIFICATION_PRIORITY.MEDIUM
      };
      
    case NOTIFICATION_TYPES.ASSESSMENT_CREATED:
      return {
        title: 'New Assessment',
        message: `${data.assessmentType} for ${data.courseName} has been created`,
        priority: NOTIFICATION_PRIORITY.HIGH
      };
      
    case NOTIFICATION_TYPES.ASSESSMENT_DUE:
      return {
        title: 'Assessment Due Soon',
        message: `${data.assessmentName} is due on ${data.dueDate}`,
        priority: NOTIFICATION_PRIORITY.URGENT
      };
      
    case NOTIFICATION_TYPES.GRADE_PUBLISHED:
      return {
        title: 'Grades Published',
        message: `Grades for ${data.assessmentName} have been published`,
        priority: NOTIFICATION_PRIORITY.HIGH
      };
      
    case NOTIFICATION_TYPES.LOW_ATTENDANCE_WARNING:
      return {
        title: 'Low Attendance Warning',
        message: `Your attendance in ${data.courseName} is below ${data.threshold}%`,
        priority: NOTIFICATION_PRIORITY.HIGH
      };
      
    default:
      return {
        title: 'Notification',
        message: data.message || 'You have a new notification',
        priority: NOTIFICATION_PRIORITY.MEDIUM
      };
  }
};

// Notification Management Functions
export const createNotification = (type, data = {}, recipients = []) => {
  return async (dispatch) => {
    try {
      // Ensure we have type and recipients
      if (!type || !recipients.length) {
        dispatch({
          type: NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_FAILURE',
          payload: 'Missing required notification data (type or recipients)'
        });
        return;
      }
      
      dispatch({ type: NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_REQUEST' });
      
      const batch = writeBatch(firestoreDb);
      const now = Timestamp.now();
      
      const content = createNotificationContent(type, data);
      
      // Create notifications for each recipient
      const notifications = recipients.map(recipientId => {
        if (!recipientId) return null;
        
        const notificationRef = doc(collection(firestoreDb, 'notifications'));
        const notification = {
          id: notificationRef.id,
          type,
          ...content,
          recipientId,
          data,
          status: NOTIFICATION_STATUS.SENT,
          createdAt: now,
          updatedAt: now
        };
        
        batch.set(notificationRef, notification);
        return notification;
      }).filter(notification => notification !== null);
      
      if (notifications.length === 0) {
        dispatch({
          type: NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_FAILURE',
          payload: 'No valid recipients'
        });
        return;
      }
      
      await batch.commit();
      
      dispatch({
        type: NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_SUCCESS',
        payload: notifications
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

export const fetchUserNotifications = (userId, options = {}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_REQUEST' });
      
      let notificationsQuery = query(
        collection(firestoreDb, 'notifications'),
        where('recipientId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      if (options.limit) {
        notificationsQuery = query(notificationsQuery, limit(options.limit));
      }
      
      if (options.status) {
        notificationsQuery = query(notificationsQuery, where('status', '==', options.status));
      }
      
      const snapshot = await getDocs(notificationsQuery);
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Count unread notifications
      const unreadCount = notifications.filter(n => n.status === NOTIFICATION_STATUS.UNREAD).length;
      
      dispatch({
        type: NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_SUCCESS',
        payload: {
          notifications,
          unreadCount
        }
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

export const markNotificationAsRead = (notificationId) => {
  return async (dispatch) => {
    try {
      if (!notificationId) {
        dispatch({
          type: NOTIFICATION_ACTIONS.MARK_AS_READ + '_FAILURE',
          payload: 'Notification ID is required'
        });
        return;
      }
      
      dispatch({ type: NOTIFICATION_ACTIONS.MARK_AS_READ + '_REQUEST' });
      
      const notificationRef = doc(firestoreDb, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        status: NOTIFICATION_STATUS.READ,
        readAt: Timestamp.now()
      });
      
      dispatch({
        type: NOTIFICATION_ACTIONS.MARK_AS_READ + '_SUCCESS',
        payload: notificationId
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.MARK_AS_READ + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

export const markNotificationAsReceived = (notificationId) => {
  return async (dispatch) => {
    try {
      if (!notificationId) {
        dispatch({
          type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
          payload: 'Notification ID is required'
        });
        return;
      }
      
      dispatch({ type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_REQUEST' });
      
      const notificationRef = doc(firestoreDb, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        status: NOTIFICATION_STATUS.RECEIVED,
        receivedAt: Timestamp.now()
      });
      
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_SUCCESS',
        payload: {
          id: notificationId,
          status: NOTIFICATION_STATUS.RECEIVED,
          receivedAt: Timestamp.now()
        }
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

export const markNotificationAsViewed = (notificationId) => {
  return async (dispatch) => {
    try {
      if (!notificationId) {
        dispatch({
          type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
          payload: 'Notification ID is required'
        });
        return;
      }
      
      dispatch({ type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_REQUEST' });
      
      const notificationRef = doc(firestoreDb, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        status: NOTIFICATION_STATUS.VIEWED,
        viewedAt: Timestamp.now()
      });
      
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_SUCCESS',
        payload: {
          id: notificationId,
          status: NOTIFICATION_STATUS.VIEWED,
          viewedAt: Timestamp.now()
        }
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

export const markNotificationAsOpened = (notificationId) => {
  return async (dispatch) => {
    try {
      if (!notificationId) {
        dispatch({
          type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
          payload: 'Notification ID is required'
        });
        return;
      }
      
      dispatch({ type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_REQUEST' });
      
      const notificationRef = doc(firestoreDb, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        status: NOTIFICATION_STATUS.OPENED,
        openedAt: Timestamp.now()
      });
      
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_SUCCESS',
        payload: {
          id: notificationId,
          status: NOTIFICATION_STATUS.OPENED,
          openedAt: Timestamp.now()
        }
      });
      
    } catch (error) {
      dispatch({
        type: NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE',
        payload: error.message
      });
      dispatch(notify({
        message: error.message,
        status: 'error'
      }));
    }
  };
};

// Reducer
export default function notificationReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  
  switch (type) {
    case NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_REQUEST':
    case NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_REQUEST':
    case NOTIFICATION_ACTIONS.MARK_AS_READ + '_REQUEST':
    case NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_SUCCESS':
      return {
        ...state,
        loading: false,
        notifications: [...payload, ...state.notifications],
        unreadCount: state.unreadCount + payload.length,
        error: null
      };
      
    case NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_SUCCESS':
      return {
        ...state,
        loading: false,
        notifications: payload.notifications,
        unreadCount: payload.unreadCount,
        error: null
      };
      
    case NOTIFICATION_ACTIONS.MARK_AS_READ + '_SUCCESS':
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map(notification =>
          notification.id === payload
            ? { ...notification, status: NOTIFICATION_STATUS.READ }
            : notification
        ),
        unreadCount: state.unreadCount - 1,
        error: null
      };
      
    case NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_SUCCESS':
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map(notification =>
          notification.id === payload.id
            ? { ...notification, ...payload }
            : notification
        ),
        // Only decrement unread count if marked as READ
        unreadCount: payload.status === NOTIFICATION_STATUS.READ
          ? state.unreadCount - 1
          : state.unreadCount,
        error: null
      };
      
    case NOTIFICATION_ACTIONS.CREATE_NOTIFICATION + '_FAILURE':
    case NOTIFICATION_ACTIONS.FETCH_NOTIFICATIONS + '_FAILURE':
    case NOTIFICATION_ACTIONS.MARK_AS_READ + '_FAILURE':
    case NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION + '_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload
      };
      
    default:
      return state;
  }
} 